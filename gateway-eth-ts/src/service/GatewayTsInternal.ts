import { BigNumber, BigNumberish, Overrides } from "ethers";

import { getExpirationTime } from "../utils/time";
import {
  MappedWriteOperation,
  Options,
  ReadOnlyOperation,
  TokenData,
} from "../utils/types";
import { Charge, ChargeParties, ChargeType, NULL_CHARGE } from "../utils/charge";
import { NULL_ADDRESS } from "../utils/constants";
import { omit } from "ramda";
import { PayableOverrides } from "@ethersproject/contracts";

/**
 * The main API of the Ethereum Gateway client library.
 * This class expects a contract object, that contains the methods specified in the
 * GatewayToken smart contract, but is agnostic to the return values of those methods.
 *
 * This allows it to be used with a contract object that returns a transaction receipt
 * (i.e. creates, signs and sends the transaction) or a PopulatedTransaction, or others.
 *
 */
export class GatewayTsInternal<
  I extends MappedWriteOperation<O> & ReadOnlyOperation,
  O
> {
  protected gatewayTokenContract: I;
  protected options: Options;

  constructor(gatewayTokenContract: I, options?: Options) {
    this.gatewayTokenContract = gatewayTokenContract;
    this.options = options ?? {};
  }

  private get overrides(): Overrides {
    return  { ...omit(["tolerateMultipleTokens"], this.options), gasLimit: 600000};
  }

  /**
   * If there is an eth charge, add the value to the overrides (making them PayableOverrides).
   * @param charge
   * @private
   */
  private payableOverrides(charge: Partial<Charge>): PayableOverrides {
    const value =
      charge.chargeType === ChargeType.ETH ? charge.value : undefined;
    return {
      ...this.overrides,
      value,
    };
  }

  /**
   * Overrides that are safe to use for read-only operations.
   * Some chains / RPC providers (e.g. Polygon zkEVM) do not allow gasPrice to be set
   * for read-only operations.
   * @private
   */
  private get readOnlyOverrides(): Overrides {
    return omit(
      ["gasPrice", "maxFeePerGas", "maxPriorityFeePerGas"],
      this.overrides
    );
  }

  public async getTokenId(
    owner: string,
    network: bigint,
    onlyActive: boolean = false
  ): Promise<BigNumber> {
    const tokenIds: BigNumber[] =
      await this.gatewayTokenContract.getTokenIdsByOwnerAndNetwork(
        owner,
        network,
        onlyActive,
        this.readOnlyOverrides
      );
    if (tokenIds.length > 1 && !this.options?.tolerateMultipleTokens)
      throw new Error("Multiple tokens found for owner and network");
    if (tokenIds.length === 0)
      throw new Error("No tokens found for owner and network");
    return tokenIds[0];
  }

  issue(
    owner: string,
    network: bigint,
    expiry: BigNumberish = 0,
    bitmask: BigNumberish = 0,
    partiesInCharge: ChargeParties,
    chargeType?: Partial<Charge>
  ): Promise<O> {
    const expirationTime = expiry.valueOf() as number;

    return this.gatewayTokenContract.mint(
      owner,
      network,
      expirationTime,
      bitmask,
      {tokenSender: partiesInCharge.feeSender, recipient: partiesInCharge.feeRecipient},
      chargeType ? this.payableOverrides(chargeType): this.overrides,
    );
  }

  async revoke(owner: string, networkId: bigint): Promise<O> {
    const tokenId = await this.getTokenId(owner, networkId);
    return this.gatewayTokenContract.revoke(tokenId, this.overrides);
  }

  async burn(owner: string, networkId: bigint): Promise<O> {
    const tokenId = await this.getTokenId(owner, networkId);
    return this.gatewayTokenContract.burn(tokenId, this.overrides);
  }

  async freeze(owner: string, networkId: bigint): Promise<O> {
    const tokenId = await this.getTokenId(owner, networkId);
    return this.gatewayTokenContract.freeze(tokenId, this.overrides);
  }

  async unfreeze(owner: string, networkId: bigint, partiesInCharge: ChargeParties): Promise<O> {
    const tokenId = await this.getTokenId(owner, networkId);
    return this.gatewayTokenContract.unfreeze(tokenId, {
      tokenSender: partiesInCharge.feeSender,
      recipient: partiesInCharge.feeRecipient,
    });
  }

  async refresh(
    owner: string,
    network: bigint,
    partiesInCharge: ChargeParties,
    expiry?: number | BigNumber,
    chargeType?: Charge
  ): Promise<O> {
    const tokenId = await this.getTokenId(owner, network);
    const expirationTime = getExpirationTime(expiry);
    return this.gatewayTokenContract.setExpiration(
      tokenId,
      expirationTime,
      { tokenSender: partiesInCharge.feeSender, recipient: partiesInCharge.feeRecipient },
      chargeType ? this.payableOverrides(chargeType): this.overrides
    );
  }

  async setBitmask(
    owner: string,
    network: bigint,
    bitmask: number | BigNumber
  ): Promise<O> {
    const tokenId = await this.getTokenId(owner, network);
    return this.gatewayTokenContract.setBitmask(
      tokenId,
      bitmask,
      this.overrides
    );
  }

  async verify(owner: string, network: bigint): Promise<boolean> {
    const result = await this.gatewayTokenContract[
      "verifyToken(address,uint256)"
    ](owner, network, this.readOnlyOverrides);

    return result.data != "0";
  }

  async getFirstTokenOnNetwork(owner: string, network: bigint): Promise<TokenData | null> {
    const [tokenId] = await this.getTokenIdsByOwnerAndNetwork(owner, network);
    if (!tokenId) return null;

    const rawData = await this.gatewayTokenContract.getToken(
      tokenId,
      this.readOnlyOverrides
    );
    return {
      owner: rawData.owner,
      tokenId,
      bitmask: rawData.bitmask,
      expiration: rawData.expiration,
      state: rawData.state,
    };
  }

  async getTokenIdsByOwnerAndNetwork(
    owner: string,
    network: bigint,
    onlyActive: boolean = false
  ): Promise<BigNumber[]> {
    return this.gatewayTokenContract.getTokenIdsByOwnerAndNetwork(
      owner,
      network,
      onlyActive,
      this.readOnlyOverrides
    );
  }

  async getTokenBitmask(tokenId: BigNumber): Promise<BigNumber> {
    return this.gatewayTokenContract.getTokenBitmask(tokenId);
  }

  async getExpiration(tokenId: BigNumber): Promise<BigNumber> {
    return this.gatewayTokenContract.getExpiration(tokenId);
  }
}
