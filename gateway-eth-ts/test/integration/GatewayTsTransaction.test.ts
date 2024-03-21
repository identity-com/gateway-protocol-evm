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
  gatekeeperNetwork,
  TEST_GATEWAY_TOKEN_ADDRESS,
} from "../../src/service/testUtils";
import { GatewayTsForwarder } from "../../src/service/GatewayTsForwarder";
import { Wallet } from "ethers";
import { GatewayNetwork, GatewayNetwork__factory } from "../../src/contracts/typechain-types";
import { BNB_TESTNET_CONTRACT_ADDRESSES, gatekeeperOneTestnetWallet, testNetworkName } from "../utils";

dotenv.config();

describe("GatewayTS Transaction", function () {
  let gateway: GatewayTsForwarder;
  let provider: BaseProvider;

  let gatekeeper: Wallet;
  let gatewayNetworkContract: GatewayNetwork;


  let testNetworkId: bigint;

  const sampleWalletAddress = Wallet.createRandom().address;

  before("Initialize GatewayTS class", async function () {
    this.timeout(20_000);

    provider = getDefaultProvider("http://localhost:8545");

    // use the deployer account here as the relayer, as they are guaranteed to be funded by hardhat on localnet startup
    gatekeeper = gatekeeperOneTestnetWallet.connect(provider);

    gatewayNetworkContract = GatewayNetwork__factory.connect(BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork, gatekeeper);


    testNetworkId = (await gatewayNetworkContract.getNetworkId(testNetworkName)).toBigInt();

    console.log("Gatekeeper:", gatekeeper.address);

    gateway = new GatewayTs(
      gatekeeper,
      TEST_GATEWAY_TOKEN_ADDRESS.gatewayToken
    ).transaction();
  });

  it.skip("should issue a token", async () => {
    const transaction = await gateway.issue(
      sampleWalletAddress,
      testNetworkId,
      0,
      0,
      {feeSender: sampleWalletAddress, feeRecipient: gatekeeper.address}
    );

    const txReceipt = await (
      await gatekeeper.sendTransaction(transaction)
    ).wait();

    console.log("TX receipt:", txReceipt);

    const token = await gateway.getFirstTokenOnNetwork(
      sampleWalletAddress,
      testNetworkId
    );

    assert.equal(token!.owner, sampleWalletAddress);
    assert.equal(token!.state, TokenState.ACTIVE);
  }).timeout(20000);
});
