import * as dotenv from "dotenv";
import * as assert from "assert";
import { GatewayGatekeeper } from "../../src/service/GatewayGatekeeper";
import { GatewayNetwork__factory, GatewayNetwork, Gatekeeper, Gatekeeper__factory} from "../../src/contracts/typechain-types";
import { BaseProvider } from "@ethersproject/providers";
import { Wallet, ethers } from "ethers";
import { BNB_TESTNET_CONTRACT_ADDRESSES, gatekeeperOneTestnetWallet, initTestNetwork, testNetworkName } from "../utils";


dotenv.config();

describe("Gateway Gatekeeper TS class", function () {
    let gatekeeperClient: GatewayGatekeeper;
    let gatekeeperContract: Gatekeeper;
    let gatewayNetworkContract: GatewayNetwork;

    let provider: BaseProvider;
    let gatekeeper: Wallet;
    let randomWallet: Wallet;
    

    before("Initialize gateway gatekeeper ts class", async function () {
        this.timeout(20000);
        provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

        gatekeeper = gatekeeperOneTestnetWallet.connect(provider);
        randomWallet = Wallet.createRandom();
        

        gatekeeperClient = new GatewayGatekeeper(gatekeeper, BNB_TESTNET_CONTRACT_ADDRESSES.gatekeeper);
        gatewayNetworkContract = GatewayNetwork__factory.connect(BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork, gatekeeper);
        gatekeeperContract = Gatekeeper__factory.connect(BNB_TESTNET_CONTRACT_ADDRESSES.gatekeeper, gatekeeper)

        await initTestNetwork(gatewayNetworkContract, gatekeeper);
    });

    it("should return the state of a valid gatekeeper", async function () {
        const gatekeeperState = await gatekeeperClient.getGatekeeperNetworkData(testNetworkName, gatekeeper.address);

        assert.equal(gatekeeperState.status, 1);
        assert.equal(gatekeeperState.initialized, true);
    }).timeout(15000);

    it("should fail to return the state of a gatekeeper that doesnt exist", async function () {
        assert.rejects(() => gatekeeperClient.getGatekeeperNetworkData(testNetworkName,randomWallet.address), Error);
    }).timeout(15000);

    it("should allow a gatekeeper to update their fee configuration", async function () {
        this.timeout(10000);
        const resultTx = await gatekeeperClient.updateFeeConfig({
            issueFee: 20,
            refreshFee: 0,
            freezeFee: 10,
            expireFee: 0
        },
        testNetworkName);

        await resultTx.wait();
    }).timeout(15000);

    it("should not allow a address that is not a gatekeeper to update their fee configuration", async function () {
        assert.rejects(() => gatekeeperClient.updateFeeConfig({
            issueFee: 20,
            refreshFee: 0,
            freezeFee: 10,
            expireFee: 0
        },
        testNetworkName), Error);
    });
})