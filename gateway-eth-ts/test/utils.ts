import { Wallet } from "ethers";
import { Provider } from "@ethersproject/providers";

export const DEFAULT_MNEMONIC =
  "test test test test test test test test test test test junk";

export const deployerWallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
export const gatekeeperOneTestnetWallet = new Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d");


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