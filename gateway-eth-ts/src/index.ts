import { GatewayTs } from "./GatewayTs";
import { utils, Wallet } from "ethers";
import { BaseProvider } from "@ethersproject/providers";
export { GasPriceKey } from "./utils/gas";
export { TokenData, SendableTransaction, SentTransaction } from "./utils/types";
export { DEFAULT_GATEWAY_TOKEN } from "./utils/constants";

export class GatewayETH extends GatewayTs {
  utils: any;

  /**
   * Creates an instance for accessing the gateway token system on Ethereum.
   * Usage example:
   * const {GatewayETH} = require('GatewayTS');
   * const gatewayTs = new GatewayETH();
   * @constructor
   * @param provider {Ethers provider, default on mainnet}
   * @param signer {Ethers wallet instance}
   * @param options {Gas, gasPrice}
   * @notice utils {Ethers utils}
   */
  constructor(
    provider: BaseProvider,
    signer?: Wallet,
    options?: { defaultGas?: number; defaultGasPrice?: any }
  ) {
    super(provider, signer, options);
    this.utils = utils;
  }
}