import { Provider } from "@ethersproject/providers";
import {
  Gatekeeper as GatekeeperType,
  Gatekeeper__factory,
  IGatewayGatekeeper
} from "../contracts/typechain-types";
import { ContractTransaction, Wallet, ethers } from "ethers";

export class GatewayGatekeeper {
  private gatewayGatekeeperContract: GatekeeperType;
  readonly providerOrWallet: Provider | Wallet;

  constructor(
    // ethers.js requires a Wallet instead of Signer for the _signTypedData function, until v6
    providerOrWallet: Provider | Wallet,
    gatewatGatekeeperContractAddress: string
  ) {
    this.gatewayGatekeeperContract = Gatekeeper__factory.connect(
      gatewatGatekeeperContractAddress,
      providerOrWallet
    );
    this.providerOrWallet = providerOrWallet;
  }

  async getGatekeeperNetworkData(networkName: string, gatekeeperAddress: string): Promise<IGatewayGatekeeper.GatekeeperNetworkDataStruct> {
    return await this.gatewayGatekeeperContract.getGatekeeperNetworkData(
        networkName,
        gatekeeperAddress,
      { gasLimit: 300000 }
    );
  }

  async updateFeeConfig(newFeeConfig: IGatewayGatekeeper.GatekeeperFeesStruct, networkName: string): Promise<ContractTransaction> {
    return await this.gatewayGatekeeperContract.updateFees(
      newFeeConfig,
      networkName,
      { gasLimit: 300000 });
  }
}
