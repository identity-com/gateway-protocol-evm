import { Wallet, ethers, utils } from "ethers";
import { DefenderRelayProvider, DefenderRelaySigner } from "@openzeppelin/defender-relay-client/lib/ethers";
import { GatewayNetwork } from "../src/contracts/typechain-types";


export const DEFAULT_MNEMONIC =
  "test test test test test test test test test test test junk";

  export const deployerWallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
  export const gatekeeperOneTestnetWallet = new Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"); // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
  export const gatekeeperTwoTestnetWallet = new Wallet("0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a");
  export const userOneWallet = new Wallet("0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a");

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const testNetworkName = utils.formatBytes32String("testNetwork_client");

interface GatewayProtocolContractAddresses {
    flagsStorage: string,
    gatekeeper: string,
    gatewayNetwork: string,
    chargeHandler: string,
    gatewayStaking: string,
    erc20: string,
    gatewayToken: string
}

export const BNB_TESTNET_CONTRACT_ADDRESSES: GatewayProtocolContractAddresses = {
    flagsStorage: "0x06c9d91b3Acc1D2434342242C987064E555FFe8a",
    gatekeeper: "0x8eB5f23002aA571B9c49b6b4c820c88c08e9ff9b",
    gatewayNetwork: "0xAccdD5e32245b090e102E94E9a78A8996F834333",
    chargeHandler: "0xDc3f03B401826FEAA80bdCA3c3CB2d5816a5Bc77",
    gatewayStaking: "0xe647c80DD554e89b70629E5f3751101A1a7F3cCE",
    erc20: "0xf380c37eFf6c5ab0593927dFf4Bc7AF6428D541F",
    gatewayToken: "0xf8cd7dE59eBB84faC87850c946d5feD2C8CbdBfA"
}

export async function loadRelayerSigner(provider?: ethers.providers.Provider) {
  const credentials = {apiKey: process.env.DEFENDER_RELAY_API_KEY!, apiSecret: process.env.DEFENDER_RELAY_SECRET!};
  provider = provider ? provider : new DefenderRelayProvider(credentials);
  return new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
}

export async function getDeploymentSigner() {
  const shouldUseDefender = process.env.SHOULD_USE_DEFENDER!.toLowerCase() == "true";

  if(shouldUseDefender) {
    return await loadRelayerSigner();
  } else {
    return new ethers.Wallet(process.env.LOCAL_DEPLOY_PRIVATE_KEY!);
  }
}

export async function initTestNetwork(gatewayNetworkContract: GatewayNetwork, gatekeeper: ethers.Signer) {
  const networkId = await gatewayNetworkContract.getNetworkId(testNetworkName, {gasLimit: 300000});
  const testNetwork = await gatewayNetworkContract.getNetwork(networkId, {gasLimit: 300000});

  if(testNetwork.primaryAuthority != await gatekeeper.getAddress()) {
    const claimAuthorityTx = await gatewayNetworkContract.connect(gatekeeper).claimPrimaryAuthority(testNetworkName, {gasLimit: 300000});
    await claimAuthorityTx.wait();
  }
}