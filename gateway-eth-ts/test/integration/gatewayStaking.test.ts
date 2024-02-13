import * as dotenv from "dotenv";
import { GatewayStaking } from "../../src/service/GatewayStaking";
import { BaseProvider } from "@ethersproject/providers";
import { Wallet, ethers } from "ethers";
import * as assert from "assert";
import { gatekeeperOneTestnetWallet, BNB_TESTNET_CONTRACT_ADDRESSES, loadRelayerSigner } from "../utils";
import { DummyBrokenERC20, DummyBrokenERC20__factory, GatewayStaking as GatewayStakingContract, GatewayStaking__factory } from "../../src/contracts/typechain-types";

dotenv.config();

describe("Gateway Staking TS class", function () {
    let gatewayStakingClient: GatewayStaking;
    let gatewayStakingContract: GatewayStakingContract;
    let dummyERC20: DummyBrokenERC20;
    let provider: BaseProvider;

    let gatekeeper: Wallet;

    before("Initialize gateway staking ts class", async function () {
        provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

        gatekeeper = gatekeeperOneTestnetWallet.connect(provider);

        gatewayStakingClient = new GatewayStaking(gatekeeper, BNB_TESTNET_CONTRACT_ADDRESSES.gatewayStaking);
        dummyERC20 = DummyBrokenERC20__factory.connect(BNB_TESTNET_CONTRACT_ADDRESSES.erc20, provider);
        gatewayStakingContract = GatewayStaking__factory.connect(BNB_TESTNET_CONTRACT_ADDRESSES.gatewayStaking, provider);

        const singner = await loadRelayerSigner();
    });

    it("should allow a gatekeeper to stake the correct ERC20 token", async function () {
        this.timeout(10000);

        const shareBalanceBefore = await gatewayStakingContract.balanceOf(gatekeeper.address);
        await dummyERC20.connect(gatekeeper).approve(BNB_TESTNET_CONTRACT_ADDRESSES.gatewayStaking, 100, {gasLimit: 300000});
        const result = await gatewayStakingClient.depositStake(BigInt(100));
        const finalTx = await result.wait();

        const event = finalTx.events?.find(e => e.event === 'Deposit');

        assert.notEqual(event, undefined);

        const shareBalanceAfter = await gatewayStakingContract.balanceOf(gatekeeper.address);
        assert.equal(shareBalanceAfter.toNumber() - shareBalanceBefore.toNumber(),100);
    })

    it("should allow a gatekeeper to withdraw stake that was deposited", async () => {
        this.timeout(10000);
        
        // gatekeeper deposits 100 dummyERC20
        await dummyERC20.connect(gatekeeper).approve(BNB_TESTNET_CONTRACT_ADDRESSES.gatewayStaking, 100, {gasLimit: 300000});
        const result = await gatewayStakingClient.depositStake(BigInt(100));
        const finalTx = await result.wait();

        const event = finalTx.events?.find(e => e.event === 'Deposit');

        assert.notEqual(event, undefined);

        const shareBalanceBefore = await gatewayStakingContract.balanceOf(gatekeeper.address);

        const withdrawlResult = await gatewayStakingClient.withdrawStake(BigInt(100));
        const finalWithdrawlTx = await withdrawlResult.wait();

        const shareBalanceAfter = await gatewayStakingContract.balanceOf(gatekeeper.address);
        assert.equal(shareBalanceBefore.toNumber() - shareBalanceAfter.toNumber(),100);

        const withdwalEvent = finalWithdrawlTx.events?.find(e => e.event === 'Withdraw');
        assert.notEqual(withdwalEvent, undefined);
    })
})