import {
  BaseProvider,
  getDefaultProvider,
  Network,
} from "@ethersproject/providers";
import { BigNumber, Wallet } from "ethers";
import { TokenData, TokenState } from "../../src/utils";
import * as assert from "assert";
import * as dotenv from "dotenv";
import { GatewayTs } from "../../src/service/GatewayTs";
import {
  TEST_GATEWAY_TOKEN_ADDRESS,
} from "../../src/service/testUtils";
import { GatewayNetwork, GatewayNetwork__factory } from "../../src/contracts/typechain-types";
import { BNB_TESTNET_CONTRACT_ADDRESSES, deployerWallet, gatekeeperOneTestnetWallet, gatekeeperTwoTestnetWallet, initTestNetwork, testNetworkName, userOneWallet } from "../utils";
dotenv.config();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe.only("GatewayTS", function () {
  this.timeout(5_000);
  let gateway: GatewayTs;
  let provider: BaseProvider;
  let network: Network;
  let gatekeeper: Wallet;
  let gatewayNetworkContract: GatewayNetwork;

  let testNetworkId: bigint;

  let sampleWalletAddress: string

  before("Initialize GatewayTS class", async function () {
    this.timeout(10000);
    provider = getDefaultProvider("https://rpc.vnet.tenderly.co/devnet/bnb-testnet-devnet/5e8683f3-9c89-47dc-9589-f6ed4feb8b68");
    network = await provider.getNetwork();
    gatekeeper = gatekeeperOneTestnetWallet.connect(provider);

    gatewayNetworkContract = GatewayNetwork__factory.connect(BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork, gatekeeper);

    testNetworkId = (await gatewayNetworkContract.getNetworkId(testNetworkName)).toBigInt();

    sampleWalletAddress = Wallet.createRandom().address;

    gateway = new GatewayTs(
      gatekeeper,
      BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken
    );
  });

  it("should issue a token", async () => {
    const randomAddress = Wallet.createRandom().address;
    await (await gateway.issue(randomAddress, testNetworkId, 0, 0, {feeSender: sampleWalletAddress, feeRecipient: gatekeeper.address})).wait();

    const token = await gateway.getFirstTokenOnNetwork(
      randomAddress,
      testNetworkId
    );

    assert.equal(token!.owner, randomAddress);
    assert.equal(token!.state, TokenState.ACTIVE);
  }).timeout(15000);

  it.skip("should tolerate multiple tokens", async () => {
    const walletWithMultipleTokens = Wallet.createRandom().address;

    await (
      await gateway.issue(walletWithMultipleTokens, testNetworkId, 0, 0, {feeSender: sampleWalletAddress, feeRecipient: gatekeeper.address})
    ).wait();
    await (
      await gateway.issue(walletWithMultipleTokens, testNetworkId, 0, 0, {feeSender: sampleWalletAddress, feeRecipient: gatekeeper.address})
    ).wait();

    // should fail
    const shouldFail = gateway.getTokenId(
      walletWithMultipleTokens,
      testNetworkId,
      true
    );
    await assert.rejects(shouldFail, Error);

    const tolerantGateway = new GatewayTs(
      gatekeeper,
      TEST_GATEWAY_TOKEN_ADDRESS.gatewayToken,
      { tolerateMultipleTokens: true }
    );

    // should not fail
    const tokenId = await tolerantGateway.getTokenId(
      walletWithMultipleTokens,
      testNetworkId
    );

    assert.ok(tokenId);
  }).timeout(30000);

  it("should issue a token with bitmask", async () => {
    const randomAddress = Wallet.createRandom().address;
    const mask = BigNumber.from(1);
    await (
      await gateway.issue(randomAddress, testNetworkId, 0, mask, {feeSender: sampleWalletAddress, feeRecipient: gatekeeper.address})
    ).wait();

    const token = await gateway.getFirstTokenOnNetwork(randomAddress, testNetworkId);
    assert.equal(token!.bitmask.toNumber(), mask.toNumber());
  }).timeout(15000);


  context("getTokenIdsByOwnerAndNetwork", () => {
    let expiredTokenAddress: string;
    before("issue a token with a short-lived expiry", async () => {
      expiredTokenAddress = Wallet.createRandom().address;
      const expiry = BigNumber.from(1);
      await (
        await gateway.issue(expiredTokenAddress, testNetworkId, expiry, 0, {feeSender: expiredTokenAddress, feeRecipient: gatekeeper.address})
      ).wait();

      // wait for the token to expire
      await sleep(101);
    });

    context("with onlyActive flag set to false", () => {
      it("when onlyActive=false is passed, should return all tokens, including expired", async () => {
        const tokenIds = await gateway.getTokenIdsByOwnerAndNetwork(
          expiredTokenAddress,
          testNetworkId,
          false
        );
        assert.equal(tokenIds.length, 1);
      });

      it("when onlyActive=false is not passed, should return all tokens, including expired", async () => {
        const tokenIds = await gateway.getTokenIdsByOwnerAndNetwork(
          expiredTokenAddress,
          testNetworkId
        );
        assert.equal(tokenIds.length, 1);
      });
    });

    it("getTokenIdsByOwnerAndNetwork should return an empty array on a wallet without a gateway token", async () => {
      const emptyWallet = Wallet.createRandom().address;
      const tokenIds = await gateway.getTokenIdsByOwnerAndNetwork(
        emptyWallet,
        testNetworkId
      );
      assert.equal(tokenIds.length, 0);
    }).timeout(10_000);
  });

  it("Missing token returns null", async () => {
    const emptyWallet = Wallet.createRandom().address;
    const token = await gateway.getFirstTokenOnNetwork(emptyWallet, testNetworkId);
    assert.ok(token === null);
  }).timeout(10_000);

  it("Test token data get functions", async () => {
    sampleWalletAddress = Wallet.createRandom().address;
    await (await gateway.issue(sampleWalletAddress, testNetworkId, 0, 0, {feeSender: sampleWalletAddress, feeRecipient: gatekeeper.address})).wait();

    const data: TokenData = await gateway.getFirstTokenOnNetwork(
      sampleWalletAddress,
      testNetworkId
    ) as TokenData;

    assert.equal(data.state, TokenState.ACTIVE);
  }).timeout(10_000);

  it("Test token bitmask get functions", async () => {

    const token = await gateway.getFirstTokenOnNetwork(
      sampleWalletAddress,
      testNetworkId
    );
    const targetBitmask = BigNumber.from("0");
    assert.deepEqual(token!.bitmask, targetBitmask);
  }).timeout(10_000);

  it("Test freeze", async () => {
    await gateway.freeze(sampleWalletAddress, testNetworkId);

    const token = await gateway.getFirstTokenOnNetwork(
      sampleWalletAddress,
      testNetworkId
    );

    assert.equal(token!.state, TokenState.FROZEN);
  });

  it("Test unfreeze", async () => {
    await gateway.unfreeze(sampleWalletAddress, testNetworkId, {feeSender: sampleWalletAddress, feeRecipient: gatekeeper.address});

    const token = await gateway.getFirstTokenOnNetwork(
      sampleWalletAddress,
      testNetworkId
    );

    assert.equal(token!.state, TokenState.ACTIVE);
  });

  it("Test refresh", async () => {
    await (await gateway.issue(sampleWalletAddress, testNetworkId, 0, 0, {feeSender: sampleWalletAddress, feeRecipient: gatekeeper.address})).wait();
    let token = await gateway.getFirstTokenOnNetwork(sampleWalletAddress, testNetworkId);

    const originalExpiry = token!.expiration;
    await gateway.refresh(sampleWalletAddress, testNetworkId, {feeSender: sampleWalletAddress, feeRecipient: gatekeeper.address}, originalExpiry.add(1000));

    token = await gateway.getFirstTokenOnNetwork(sampleWalletAddress, testNetworkId);

    assert.equal(BigNumber.from(token!.expiration).gt(originalExpiry), true);
  });

  it.skip("Test subscribe", async () => {
    const token = await gateway.getFirstTokenOnNetwork(
      sampleWalletAddress,
      testNetworkId
    );

    let resolvePromiseCallback: (gatewayToken: TokenData) => void;

    const resolvedPromise = new Promise<TokenData>((resolve) => {
      resolvePromiseCallback = (gatewayToken) => resolve(gatewayToken);
    });

    const subscription = gateway.onGatewayTokenChange(
      sampleWalletAddress,
      testNetworkId,
      resolvePromiseCallback
    );

    await gateway.refresh(sampleWalletAddress, testNetworkId, {feeSender: sampleWalletAddress, feeRecipient: gatekeeper.address}, 1000);

    const updatedToken = await resolvedPromise.finally(
      subscription.unsubscribe
    );

    assert.equal(updatedToken.tokenId.toString(), token!.tokenId.toString());
  });
});