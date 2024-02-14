import { Provider } from "@ethersproject/providers";
import {
  GatewayNetwork,
  GatewayNetwork__factory,
  IGatewayGatekeeper,
  IGatewayNetwork
} from "../contracts/typechain-types";
import { BigNumberish, ContractTransaction, Wallet, ethers } from "ethers";

export enum GatewayNetworkFeatures {
  REMOVE_GATEKEEPER_INVALIDATES_TOKENS
};

export enum GatekeeperStatus {
    HALTED = 0,
    ACTIVE,
    FROZEN
}
 

export class GatewayNetworkClass {
  private gatewayNetworkContract: GatewayNetwork;

  readonly providerOrWallet: Provider | Wallet;

  constructor(
    // ethers.js requires a Wallet instead of Signer for the _signTypedData function, until v6
    providerOrWallet: Provider | Wallet,
    gatewatNetworkContractAddress: string,
  ) {
    this.gatewayNetworkContract = GatewayNetwork__factory.connect(
      gatewatNetworkContractAddress,
      providerOrWallet
    );
    this.providerOrWallet = providerOrWallet;
  }

  async withdrawNetworkFees(networkName: string): Promise<ContractTransaction> {
    return await this.gatewayNetworkContract.withdrawNetworkFees(
      networkName,
      { gasLimit: 300000 }
    );
  }

  async addGatekeeper(networkName: string, newGatekeeperAddress: string): Promise<ContractTransaction> {
    return await this.gatewayNetworkContract.addGatekeeper(
        newGatekeeperAddress,
      networkName,
      { gasLimit: 300000 }
    );
  }

  async removeGatekeeper(networkName: string, gatekeeperAddress: string): Promise<ContractTransaction> {
    return await this.gatewayNetworkContract.removeGatekeeper(
      gatekeeperAddress,
      networkName,
      { gasLimit: 300000 }
    );
  }

  async updatePrimaryAuthority(networkName: string, newPrimaryAuthority: string): Promise<ContractTransaction> {
    return await this.gatewayNetworkContract.updatePrimaryAuthority(
      newPrimaryAuthority,
      networkName,
      { gasLimit: 300000 }
    );
  }

  async claimPrimaryAuthority(networkName: string): Promise<ContractTransaction> {
    return await this.gatewayNetworkContract.claimPrimaryAuthority(
      networkName,
      { gasLimit: 300000 }
    );
  }

  async updateGatekeeperStatus(networkName: string, gatekeeperAddress: string, newGatekeeperStatusConfig: GatekeeperStatus): Promise<ContractTransaction> {
    return await this.gatewayNetworkContract.updateGatekeeperStatus(
      gatekeeperAddress,
      networkName,
      newGatekeeperStatusConfig,
      { gasLimit: 300000 }
    );
  }

  async updatePassExpirationTimeConfig(networkName: string, newExpirationTimeInSeconds: BigNumberish): Promise<ContractTransaction> {
    return await this.gatewayNetworkContract.updatePassExpirationTime(
      newExpirationTimeInSeconds,
      networkName,
      { gasLimit: 300000 }
    );
  }

  async updateNetworkFeatures(networkName: string, newFeatureMask: BigNumberish): Promise<ContractTransaction> {
    return await this.gatewayNetworkContract.updateNetworkFeatures(
        newFeatureMask,
      networkName,
      { gasLimit: 300000 }
    );
  }

  async updateFees(networkName: string, newNetworkFeeConfig: IGatewayNetwork.NetworkFeesBpsStruct): Promise<ContractTransaction> {
    return await this.gatewayNetworkContract.updateFees(
        newNetworkFeeConfig,
        networkName,
      { gasLimit: 300000 }
    );
  }

  /////// Public functions

  async networkHasFeature(networkName: string, networkFeature: GatewayNetworkFeatures): Promise<boolean> {
    return await this.gatewayNetworkContract.networkHasFeature(
        networkName,
        networkFeature,
      { gasLimit: 300000 }
    );
  }

  async isGatekeeper(networkName: string, gatekeeperAddress: string): Promise<boolean> {
    return await this.gatewayNetworkContract.isGateKeeper(
      networkName,
      gatekeeperAddress,
      { gasLimit: 300000 }
    );
  }

  async getNetworkId(networkName: string): Promise<BigNumberish> {
    return await this.gatewayNetworkContract.getNetworkId(
      networkName,
      { gasLimit: 300000 }
    );
  }

  async getNetwork(networkId: string): Promise<IGatewayNetwork.GatekeeperNetworkDataStruct> {
    return await this.gatewayNetworkContract.getNetwork(
        networkId,
      { gasLimit: 300000 }
    );
  }

  async doesNetworkExist(networkId: string): Promise<boolean> {
    return await this.gatewayNetworkContract.doesNetworkExist(
        networkId,
      { gasLimit: 300000 }
    );
  }

  async getSupportedFeeTokenAddress(networkName: string): Promise<string> {
    return await this.gatewayNetworkContract.getSupportedToken(
        networkName,
      { gasLimit: 300000 }
    );
  }

  async getGatekeepersOnNetwork(networkName: string): Promise<string[]> {
    return await this.gatewayNetworkContract.getGatekeepersOnNetwork(
        networkName,
      { gasLimit: 300000 }
    );
  }

}
