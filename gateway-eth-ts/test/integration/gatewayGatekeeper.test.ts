import * as dotenv from "dotenv";
import * as assert from "assert";
import { GatewayGatekeeper } from "../../src/service/GatewayGatekeeper";
import { GatewayNetwork__factory, GatewayNetwork } from "../../src/contracts/typechain-types";
import { BaseProvider } from "@ethersproject/providers";
import { Wallet, ethers, utils } from "ethers";
import { BNB_TESTNET_CONTRACT_ADDRESSES, ZERO_ADDRESS, gatekeeperOneTestnetWallet, loadRelayerSigner } from "../utils";


dotenv.config();

describe.only("Gateway Gatekeeper TS class", function () {
    let gatekeeperClient: GatewayGatekeeper;
    let gatewayNetworkContract: GatewayNetwork;

    let provider: BaseProvider;
    let gatekeeper: Wallet;

    const testNetworkName = utils.formatBytes32String("testNetworkClient");
    

    before("Initialize gateway gatekeeper ts class", async function () {
        this.timeout(20000);
        provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

        gatekeeper = gatekeeperOneTestnetWallet.connect(provider);
        const singner = await loadRelayerSigner();

        gatekeeperClient = new GatewayGatekeeper(gatekeeper, BNB_TESTNET_CONTRACT_ADDRESSES.gatekeeper);
        gatewayNetworkContract = GatewayNetwork__factory.connect(BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork, singner);

        // Create a new test network
        const primaryAuthorityAddress = await singner.getAddress();


        const networkCreateTx = await gatewayNetworkContract.connect(singner).createNetwork({
            primaryAuthority: primaryAuthorityAddress,
            name: testNetworkName,
            passExpireDurationInSeconds: 0,
            networkFeatureMask: 0,
            networkFee: {
                issueFee: 0,
                refreshFee: 0,
                expireFee: 0,
                freezeFee: 0
            },
            supportedToken: ZERO_ADDRESS,
            gatekeepers: [],
            lastFeeUpdateTimestamp: 0
        },{gasLimit: 300000});

        await networkCreateTx.wait();
        // Add a new gatekeeper

        const addNewGatekeeperTx = await gatewayNetworkContract.connect(singner).addGatekeeper(gatekeeper.address, testNetworkName, {gasLimit: 300000});
        await addNewGatekeeperTx.wait();

    });

    it.skip("should return the state of a valid gatekeeper", async function () {
        const gatekeeperState = await gatekeeperClient.getGatekeeperNetworkData(testNetworkName, gatekeeper.address);

        assert.equal(gatekeeperState.status, 1);
        assert.equal(gatekeeperState.initialized, true);
    });

    it("should fail to return the state of a gatekeeper that doesnt exist", async function () {
        assert.throws(() => gatekeeperClient.getGatekeeperNetworkData(testNetworkName,gatekeeper.address), Error, "GatekeeperNotInNetwork");
    });

    it("should allow a gatekeeper to update their fee configuration", async function () {
        const resultTx = await gatekeeperClient.updateFeeConfig({
            issueFee: 20,
            refreshFee: 0,
            freezeFee: 10,
            expireFee: 0
        },
        testNetworkName);

        await resultTx.wait();
    });

    it("should not allow a address that is not a gatekeeper to update their fee configuration", async function () {
    
    });
})