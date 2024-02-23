import {
  BaseProvider,
  getDefaultProvider,
  TransactionReceipt,
} from "@ethersproject/providers";
import { TokenState } from "../../src/utils";
import * as assert from "assert";
import * as dotenv from "dotenv";
import { GatewayTs } from "../../src/service/GatewayTs";
import { PopulatedTransaction, Signer } from "ethers/lib/ethers";
import { GatewayTsForwarder } from "../../src/service/GatewayTsForwarder";
import { ethers, Wallet } from "ethers";
import { BigNumber } from "ethers";
import {
  approveERC20Charge,
  approveInternalERC20Charge,
  ChargeType,
  makeERC20Charge,
  makeWeiCharge,
} from "../../src/utils/charge";
import { BNB_TESTNET_CONTRACT_ADDRESSES, gatekeeperOneTestnetWallet, gatekeeperTwoTestnetWallet, initTestNetwork, testNetworkName, testNetworkNameWithErc20Fees, testNetworkNameWithNativeFees, userOneWallet } from "../utils";
import { DummyBrokenERC20, DummyBrokenERC20__factory, Gatekeeper, Gatekeeper__factory, GatewayNetwork, GatewayNetwork__factory } from "../../src/contracts/typechain-types";
import { GatewayNetworkClass } from "../../src/service/GatewayNetwork";

dotenv.config();

describe("GatewayTS Forwarder", function () {
  let gateway: GatewayTsForwarder;
  let gatewayTwo: GatewayTsForwarder;
  let provider: BaseProvider;
  let gatewayNetworkContract: GatewayNetwork;
  let gatekeeperContract: Gatekeeper;
  let dummyERC20: DummyBrokenERC20;

  let gatekeeper: Wallet;
  let gatekeeperTwo: Wallet;
  let relayer: Wallet;
  let singner: Signer

  let testNetworkId: bigint;
  let testNetworkIdNativeFees: bigint;
  let testNetworkIdErc20Fees: bigint;

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
    fn: () => Promise<PopulatedTransaction>,
    txSender?: Wallet
  ): Promise<TransactionReceipt> => {
    const populatedTx = await fn();
    const serialized = JSON.stringify(populatedTx);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { to, data, value } = JSON.parse(serialized);

    if(txSender) {
      const r = await txSender.sendTransaction({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        to,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value,
        gasLimit: 600000
      });

      console.log("GAS LIMIT:", r.gasLimit.toString());

      return r.wait();

    } else {
      const r = await relayer.sendTransaction({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        to,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value,
        gasLimit: 600000
      });

      console.log("GAS LIMIT:", r.gasLimit.toString());

      return r.wait();
    }
  };

  const erc20Balance = (address: string): Promise<BigNumber> => {
    // check erc20 balance
    const contract = new ethers.Contract(
      BNB_TESTNET_CONTRACT_ADDRESSES.erc20,
      [
        "function balanceOf(address owner) view returns (uint256)",
        "function allowance(address owner, address spender) view returns (uint256)",
      ],
      provider
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return contract.balanceOf(address);
  };

  before("Initialize GatewayTS class", async function () {
    this.timeout(20000);

    provider = getDefaultProvider("http://localhost:8545");

    // use the deployer account here as the relayer, as they are guaranteed to be funded by hardhat on localnet startup
    relayer = gatekeeperOneTestnetWallet.connect(provider);
    gatekeeper = gatekeeperOneTestnetWallet.connect(provider);
    gatekeeperTwo = gatekeeperTwoTestnetWallet.connect(provider);

    gatewayNetworkContract = GatewayNetwork__factory.connect(BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork, gatekeeper);
    dummyERC20 = DummyBrokenERC20__factory.connect(BNB_TESTNET_CONTRACT_ADDRESSES.erc20, gatekeeper);
    gatekeeperContract = Gatekeeper__factory.connect(BNB_TESTNET_CONTRACT_ADDRESSES.gatekeeper, gatekeeper)
    
    await initTestNetwork(gatewayNetworkContract, gatekeeper);


    testNetworkId = (await gatewayNetworkContract.getNetworkId(testNetworkName)).toBigInt();

    testNetworkIdNativeFees = (await gatewayNetworkContract.getNetworkId(testNetworkNameWithNativeFees)).toBigInt();

    testNetworkIdErc20Fees = (await gatewayNetworkContract.getNetworkId(testNetworkNameWithErc20Fees)).toBigInt();


    // gatekeeper two update fees

    await gatewayNetworkContract.connect(gatekeeper).addGatekeeper(gatekeeper.address, testNetworkNameWithErc20Fees, {gasLimit: 300000});

    await gatekeeperContract.connect(gatekeeper).updateFees({issueFee: 1000, refreshFee: 1000, freezeFee: 1000, expireFee: 1000}, testNetworkNameWithErc20Fees, {gasLimit: 300000});

    // gatekeeper two update fees

    await gatewayNetworkContract.connect(gatekeeperTwo).addGatekeeper(gatekeeperTwo.address, testNetworkNameWithNativeFees);

    await gatekeeperContract.connect(gatekeeperTwo).updateFees({issueFee: 1000, refreshFee: 1000, freezeFee: 1000, expireFee: 1000}, testNetworkNameWithNativeFees, {gasLimit: 300000});

    // Create clients


    gateway = new GatewayTs(
      gatekeeper,
      BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken
    ).forward(BNB_TESTNET_CONTRACT_ADDRESSES.forwarder);

    gatewayTwo = new GatewayTs(
      gatekeeperTwo,
      BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken
    ).forward(BNB_TESTNET_CONTRACT_ADDRESSES.forwarder);
  });


  it("should issue a token", async () => {
    await relaySerialized(() =>
      gateway.issue(sampleWalletAddress, testNetworkId, 0, 0, {feeSender: sampleWalletAddress, feeRecipient: gatekeeper.address})
    );

    const token = await gateway.getFirstTokenOnNetwork(
      sampleWalletAddress,
      testNetworkId
    );

    assert.equal(token.owner, sampleWalletAddress);
    assert.equal(token.state, TokenState.ACTIVE);

  }).timeout(15000);

 

  it("should issue a token with an eth charge", async () => {

    const gatekeeperBalanceBefore = await gatekeeperTwo.getBalance();
    const networkWithEthChargeId = (await gatewayNetworkContract.connect(gatekeeperTwo).getNetworkId(testNetworkNameWithNativeFees)).toBigInt();

    const wallet = userOneWallet.connect(provider);
    await relaySerialized(() =>
    gatewayTwo.issue(wallet.address, networkWithEthChargeId, 0, 0, {feeSender: wallet.address, feeRecipient: gatekeeperTwo.address}, {chargeType: ChargeType.ETH, value: BigNumber.from(1000)}),
    wallet
    );

    const gatekeeperBalanceAfter = await gatekeeperTwo.getBalance();

    const networkClass =  new GatewayNetworkClass(gatekeeperTwo, BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork);

    // primary authority of network can withdraw fees
    await networkClass.withdrawNetworkFees(testNetworkNameWithNativeFees);

    assert.equal(
      true,
      gatekeeperBalanceAfter.sub(gatekeeperBalanceBefore).toNumber() !== 0
    );
  }).timeout(15000);

  it("should issue a token with an ERC20 charge", async () => {
    const wallet = userOneWallet.connect(provider);
    const chargeValue = BigNumber.from(1000);

    const charge = makeERC20Charge(
      chargeValue,
      BNB_TESTNET_CONTRACT_ADDRESSES.erc20,
      wallet.address,
      gatekeeper.address
    );

    const approveTx = await approveERC20Charge(
      charge,
      provider,
      BNB_TESTNET_CONTRACT_ADDRESSES.chargeHandler
    );

    const approveTx2 = await approveERC20Charge(
      charge,
      provider,
      BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork
    );

    const internalApproveTx = await approveInternalERC20Charge(
      charge,
      testNetworkIdErc20Fees,
      provider,
      BNB_TESTNET_CONTRACT_ADDRESSES.chargeHandler,
      BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken
    );

    const payerBalanceBefore = await erc20Balance(wallet.address);
    const gatekeeperBalanceBefore = await erc20Balance(gatekeeper.address);

    await (await wallet.sendTransaction(approveTx)).wait();
    await (await wallet.sendTransaction(approveTx2)).wait();
    await (await wallet.sendTransaction(internalApproveTx)).wait();

    await relaySerialized(() =>
      gateway.issue(wallet.address, testNetworkIdErc20Fees, 0, 0, {feeSender: wallet.address, feeRecipient: gatekeeper.address}, {chargeType: ChargeType.ERC20, value: BigNumber.from(1000)}),
      wallet
    );

    const payerBalanceAfter = await erc20Balance(wallet.address);
    const gatekeeperBalanceAfter = await erc20Balance(gatekeeper.address);

    // the gatekeeper's balance has gone up
    assert.equal(
      true,
      gatekeeperBalanceAfter.sub(gatekeeperBalanceBefore).toNumber() > 0
    );

    // the payer's balance has gone down
    assert.equal(
      true,
      payerBalanceBefore.sub(payerBalanceAfter).toNumber() > 0
    );
  }).timeout(15000);

  it.skip("Test freeze", async () => {
    await relay(() => gateway.freeze(sampleWalletAddress, gatekeeperNetwork));

    const token = await gateway.getToken(
      sampleWalletAddress,
      gatekeeperNetwork
    );

    assert.equal(token.state, TokenState.FROZEN);
  });

  it.skip("Test unfreeze", async () => {
    await relay(() => gateway.unfreeze(sampleWalletAddress, gatekeeperNetwork));

    const token = await gateway.getToken(
      sampleWalletAddress,
      gatekeeperNetwork
    );

    assert.equal(token.state, TokenState.ACTIVE);
  });

  it.skip("Test refresh", async () => {
    let token = await gateway.getToken(sampleWalletAddress, gatekeeperNetwork);

    const originalExpiry = token.expiration;

    await relay(() =>
      gateway.refresh(sampleWalletAddress, gatekeeperNetwork, 1000)
    );

    token = await gateway.getToken(sampleWalletAddress, gatekeeperNetwork);

    assert.equal(BigNumber.from(token.expiration).gt(originalExpiry), true);
  });

  it.skip("Test refresh with an eth charge", async () => {
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

  it.skip("should allow parameterisable gas limit for the internal transaction", async () => {
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
