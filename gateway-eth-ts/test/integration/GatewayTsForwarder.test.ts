import {
  BaseProvider,
  getDefaultProvider,
  TransactionReceipt,
} from "@ethersproject/providers";
import { TokenState } from "../../src/utils";
import * as assert from "assert";
import * as dotenv from "dotenv";
import { GatewayTs } from "../../src/service/GatewayTs";
import {
  deployerWallet,
  gatekeeperNetwork,
  gatekeeperWallet,
  TEST_GATEWAY_TOKEN_ADDRESS,
} from "../../src/service/testUtils";
import { PopulatedTransaction } from "ethers/lib/ethers";
import { GatewayTsForwarder } from "../../src/service/GatewayTsForwarder";
import { ethers, Wallet } from "ethers";
import { BigNumber } from "ethers";
import {
  approveERC20Charge,
  approveInternalERC20Charge,
  makeERC20Charge,
  makeWeiCharge,
} from "../../src/utils/charge";

dotenv.config();

describe.skip("GatewayTS Forwarder", function () {
  let gateway: GatewayTsForwarder;
  let provider: BaseProvider;

  let gatekeeper: Wallet;
  let relayer: Wallet;

  const sampleWalletAddress = Wallet.createRandom().address;

  const relay = async (
    fn: () => Promise<PopulatedTransaction>
  ): Promise<TransactionReceipt> => {
    const populatedTx = await fn();
    return (await relayer.sendTransaction(populatedTx)).wait();
  };

  const estimateGas = async (
    fn: () => Promise<PopulatedTransaction>
  ): Promise<BigNumber> => {
    const populatedTx = await fn();
    const serialized = JSON.stringify(populatedTx);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { to, data, value } = JSON.parse(serialized);

    return relayer.estimateGas({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      to,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value,
    });
  };

  const relaySerialized = async (
    fn: () => Promise<PopulatedTransaction>
  ): Promise<TransactionReceipt> => {
    const populatedTx = await fn();
    const serialized = JSON.stringify(populatedTx);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { to, data, value } = JSON.parse(serialized);

    const r = await relayer.sendTransaction({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      to,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value,
    });
    console.log("GAS LIMIT:", r.gasLimit.toString());

    return r.wait();
  };

  // address of the erc20 token used for testing (obtainable from the output of yarn pretest)
  const ERC20_TOKEN = "0x32CC358eb763B345f565fcf84f2B31a52d6a93D6";
  const erc20Balance = (address: string): Promise<BigNumber> => {
    // check erc20 balance
    const contract = new ethers.Contract(
      ERC20_TOKEN,
      [
        "function balanceOf(address owner) view returns (uint256)",
        "function allowance(address owner, address spender) view returns (uint256)",
      ],
      provider
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return contract.balanceOf(address);
  };

  before("Initialize GatewayTS class", function () {
    this.timeout(20_000);

    provider = getDefaultProvider("http://localhost:8545");

    // use the deployer account here as the relayer, as they are guaranteed to be funded by hardhat on localnet startup
    relayer = deployerWallet(provider);
    gatekeeper = gatekeeperWallet(provider);

    console.log("Gatekeeper:", gatekeeper.address);
    console.log("Relayer:", relayer.address);

    gateway = new GatewayTs(
      gatekeeper,
      TEST_GATEWAY_TOKEN_ADDRESS.gatewayToken
    ).forward(TEST_GATEWAY_TOKEN_ADDRESS.forwarder);
  });

  it("should issue a token", async () => {
    await relaySerialized(() =>
      gateway.issue(sampleWalletAddress, gatekeeperNetwork)
    );

    const token = await gateway.getToken(
      sampleWalletAddress,
      gatekeeperNetwork
    );

    assert.equal(token.owner, sampleWalletAddress);
    assert.equal(token.state, TokenState.ACTIVE);
  });

  it("should issue a token with an eth charge", async () => {
    const gatekeeperBalanceBefore = await gatekeeper.getBalance();

    const wallet = Wallet.createRandom().address;
    const chargeValue = BigNumber.from(1000);
    const charge = makeWeiCharge(chargeValue, gatekeeper.address);
    await relaySerialized(() =>
      gateway.issue(wallet, gatekeeperNetwork, undefined, undefined, charge)
    );

    const gatekeeperBalanceAfter = await gatekeeper.getBalance();

    assert.equal(
      chargeValue.toNumber(),
      gatekeeperBalanceAfter.sub(gatekeeperBalanceBefore).toNumber()
    );
  });

  it("should issue a token with an ERC20 charge", async () => {
    const wallet = Wallet.createRandom().address;
    const chargeValue = BigNumber.from(1000);

    const charge = makeERC20Charge(
      chargeValue,
      ERC20_TOKEN,
      relayer.address, // we are making the relayer pay (not the gateway token recipient)
      gatekeeper.address
    );

    const approveTx = await approveERC20Charge(
      charge,
      provider,
      TEST_GATEWAY_TOKEN_ADDRESS.chargeHandler
    );

    const internalApproveTx = await approveInternalERC20Charge(
      charge,
      gatekeeperNetwork,
      provider,
      TEST_GATEWAY_TOKEN_ADDRESS.chargeHandler,
      TEST_GATEWAY_TOKEN_ADDRESS.gatewayToken
    );

    const payerBalanceBefore = await erc20Balance(relayer.address);
    const gatekeeperBalanceBefore = await erc20Balance(gatekeeper.address);

    await (await relayer.sendTransaction(approveTx)).wait();
    await (await relayer.sendTransaction(internalApproveTx)).wait();

    await relaySerialized(() =>
      gateway.issue(wallet, gatekeeperNetwork, undefined, undefined, charge)
    );

    const payerBalanceAfter = await erc20Balance(relayer.address);
    const gatekeeperBalanceAfter = await erc20Balance(gatekeeper.address);

    // the gatekeeper's balance has gone up
    assert.equal(
      chargeValue.toNumber(),
      gatekeeperBalanceAfter.sub(gatekeeperBalanceBefore).toNumber()
    );

    // the payer's balance has gone down
    assert.equal(
      chargeValue.toNumber(),
      payerBalanceBefore.sub(payerBalanceAfter).toNumber()
    );
  });

  it("Test freeze", async () => {
    await relay(() => gateway.freeze(sampleWalletAddress, gatekeeperNetwork));

    const token = await gateway.getToken(
      sampleWalletAddress,
      gatekeeperNetwork
    );

    assert.equal(token.state, TokenState.FROZEN);
  });

  it("Test unfreeze", async () => {
    await relay(() => gateway.unfreeze(sampleWalletAddress, gatekeeperNetwork));

    const token = await gateway.getToken(
      sampleWalletAddress,
      gatekeeperNetwork
    );

    assert.equal(token.state, TokenState.ACTIVE);
  });

  it("Test refresh", async () => {
    let token = await gateway.getToken(sampleWalletAddress, gatekeeperNetwork);

    const originalExpiry = token.expiration;

    await relay(() =>
      gateway.refresh(sampleWalletAddress, gatekeeperNetwork, 1000)
    );

    token = await gateway.getToken(sampleWalletAddress, gatekeeperNetwork);

    assert.equal(BigNumber.from(token.expiration).gt(originalExpiry), true);
  });

  it("Test refresh with an eth charge", async () => {
    const gatekeeperBalanceBefore = await gatekeeper.getBalance();

    const token = await gateway.getToken(
      sampleWalletAddress,
      gatekeeperNetwork
    );
    const chargeValue = BigNumber.from(1000);
    const charge = makeWeiCharge(chargeValue, gatekeeper.address);

    await relay(() =>
      gateway.refresh(sampleWalletAddress, gatekeeperNetwork, 1000, charge)
    );

    const gatekeeperBalanceAfter = await gatekeeper.getBalance();

    assert.equal(
      chargeValue.toNumber(),
      gatekeeperBalanceAfter.sub(gatekeeperBalanceBefore).toNumber()
    );
  });

  it("should allow parameterisable gas limit for the internal transaction", async () => {
    const parameterisedGateway = new GatewayTs(
      gatekeeper,
      TEST_GATEWAY_TOKEN_ADDRESS.gatewayToken,
      { gasLimit: 10_000_000 }
    ).forward(TEST_GATEWAY_TOKEN_ADDRESS.forwarder);

    // setting the gas limit too high in the forwarder means that the
    // internal transaction will fail, as the forwarder will reject
    // due to the 1/64th rule, unless the estimateGas call raises the limit
    // of the external transaction
    const estimatedGasWithHighLimit = await estimateGas(() =>
      parameterisedGateway.issue(sampleWalletAddress, gatekeeperNetwork)
    );
    const estimatedGasWithNormalLimit = await estimateGas(() =>
      gateway.issue(sampleWalletAddress, gatekeeperNetwork)
    );

    assert.ok(estimatedGasWithHighLimit.gt(estimatedGasWithNormalLimit));
  });
});
