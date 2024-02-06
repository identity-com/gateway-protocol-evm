import * as dotenv from "dotenv";
import { GatewayStaking } from "../../src/service/GatewayStaking";
import { BaseProvider, TransactionReceipt, getDefaultProvider } from "@ethersproject/providers";
import { PopulatedTransaction, Wallet } from "ethers";

dotenv.config();

describe("Gateway Staking TS client test", function () {
    let gatewayStakingclient: GatewayStaking;
    let provider: BaseProvider;

    let gatekeeper: Wallet;
    let relayer: Wallet;

    const randomWalletAddress = Wallet.createRandom().address;

    const relay = async (
        fn: () => Promise<PopulatedTransaction>
      ): Promise<TransactionReceipt> => {
        const populatedTx = await fn();
        return (await relayer.sendTransaction(populatedTx)).wait();
    };

    before("Initialize gateway staking ts class", function () {
        provider = getDefaultProvider("http://localhost:8545");
    });
})