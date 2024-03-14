import { DefenderRelayProvider, DefenderRelaySigner } from "@openzeppelin/defender-relay-client/lib/ethers";
import { Wallet, ethers, utils } from "ethers";

interface GatewayProtocolContractAddresses {
    flagsStorage: string,
    gatekeeper: string,
    gatewayNetwork: string,
    chargeHandler: string,
    gatewayStaking: string,
    erc20: string,
    gatewayToken: string,
    forwarder: string,
    trustedForwarder: string
}

export const BNB_TESTNET_CONTRACT_ADDRESSES: GatewayProtocolContractAddresses = {
    flagsStorage: "0x06c9d91b3Acc1D2434342242C987064E555FFe8a",
    gatekeeper: "0x47340b5b62a1c9038aa70dc1e7344be5a59da8af",
    gatewayNetwork: "0xcbB5C0536BC80c6983CFaab2574685b5F3b679cb",
    chargeHandler: "0xDc3f03B401826FEAA80bdCA3c3CB2d5816a5Bc77",
    gatewayStaking: "0xf1311706736cf9e75992252e2ab2824f530f847b",
    erc20: "0xf380c37eFf6c5ab0593927dFf4Bc7AF6428D541F",
    gatewayToken: "0xc25e8e4fd1a892e6c6883ea8e6f3c3eb3b115f44",
    forwarder: "0x96b905fF1eDfAdAEc03879450f3DC35a8124dc05",
    trustedForwarder: "0x96b905ff1edfadaec03879450f3dc35a8124dc05"
}

/**
 * Testnet wallets (foundry defaults)
 */

export const DEFAULT_MNEMONIC =
  "test test test test test test test test test test test junk";


export const deployerWallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
export const gatekeeperOneTestnetWallet = new Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"); // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export const gatekeeperTwoTestnetWallet = new Wallet("0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"); // 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
export const userOneWallet = new Wallet("0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a"); // 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const testNetworkName = utils.formatBytes32String("Identity.com KYC Verification");


export const testNetworkNameWithErc20Fees = "0x6e7574776f726b5f476974685f65726332305f66656573000000000000000000"; // gatekeeper 1
export const testNetworkNameWithNativeFees = "0x6e6574776f726b5f776974685f6e61746976655f666565730000000000000000"; // gatekeeper 2

export async function loadRelayerSigner(provider?: ethers.providers.Provider) {
    const credentials = {apiKey: process.env.DEFENDER_RELAY_API_KEY!, apiSecret: process.env.DEFENDER_RELAY_SECRET!};
    provider = provider ? provider : new DefenderRelayProvider(credentials);
    return new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
}