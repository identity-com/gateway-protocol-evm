/* eslint-disable camelcase */
import { Provider } from "@ethersproject/providers";
import {
  GatewayToken,
  GatewayToken__factory,
  IForwarder__factory,
} from "../contracts/typechain-types";
import { GatewayTsInternal } from "./GatewayTsInternal";
import { ForwarderOptions, GatewayTsForwarder } from "./GatewayTsForwarder";
import { Wallet } from "ethers";
import { ContractTransaction } from "ethers";
import {
  onGatewayTokenChange,
  removeGatewayTokenChangeListener,
  TokenData,
} from "../utils";
import { GatewayTsTransaction } from "./GatewayTsTransaction";
import { Options } from "../utils/types";
import { DEFAULT_GAS_LIMIT } from "../utils/constants";

export class GatewayTs extends GatewayTsInternal<
  GatewayToken,
  ContractTransaction
> {
  readonly providerOrWallet: Provider | Wallet;

  constructor(
    // ethers.js requires a Wallet instead of Signer for the _signTypedData function, until v6
    providerOrWallet: Provider | Wallet,
    gatewayTokenContractAddress: string,
    options: Options = {}
  ) {
    const gatewayTokenContract = GatewayToken__factory.connect(
      gatewayTokenContractAddress,
      providerOrWallet
    );
    super(gatewayTokenContract, options);

    this.gatewayTokenContract = gatewayTokenContract;
    this.providerOrWallet = providerOrWallet;
  }

  private get forwarderOptions(): ForwarderOptions {
    const gasLimit = this.options.gasLimit ? this.options.gasLimit : DEFAULT_GAS_LIMIT;
    if (gasLimit && typeof gasLimit !== "number") {
      throw new Error("gasLimit must be a number to use the forwarder");
    }
    return this.options as ForwarderOptions;
  }

  public forward(forwarderAddress: string): GatewayTsForwarder {
    const forwarderContract = IForwarder__factory.connect(
      forwarderAddress,
      this.providerOrWallet
    );

    return new GatewayTsForwarder(
      this.providerOrWallet,
      this.gatewayTokenContract,
      forwarderContract,
      this.forwarderOptions as Options
    );
  }

  public transaction(): GatewayTsTransaction {
    return new GatewayTsTransaction(this.gatewayTokenContract, this.options);
  }

  public onGatewayTokenChange(
    owner: string,
    network: bigint,
    callback: (gatewayToken: TokenData) => void
  ): { unsubscribe: () => void } {
    const subscription = onGatewayTokenChange(owner, network, this, callback);
    return {
      unsubscribe: () => {
        removeGatewayTokenChangeListener(subscription);
      },
    };
  }
}
