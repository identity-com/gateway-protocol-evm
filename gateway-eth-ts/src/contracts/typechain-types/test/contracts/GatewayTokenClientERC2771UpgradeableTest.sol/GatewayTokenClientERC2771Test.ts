/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface GatewayTokenClientERC2771TestInterface
  extends utils.Interface {
  functions: {
    "initialize(address,uint256,address[])": FunctionFragment;
    "isTrustedForwarder(address)": FunctionFragment;
    "testGated()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "initialize" | "isTrustedForwarder" | "testGated"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "isTrustedForwarder",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "testGated", values?: undefined): string;

  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "testGated", data: BytesLike): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "Success()": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Success"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface SuccessEventObject {}
export type SuccessEvent = TypedEvent<[], SuccessEventObject>;

export type SuccessEventFilter = TypedEventFilter<SuccessEvent>;

export interface GatewayTokenClientERC2771Test extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GatewayTokenClientERC2771TestInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    initialize(
      gatewayTokenContract: PromiseOrValue<string>,
      gatekeeperNetwork: PromiseOrValue<BigNumberish>,
      trustedForwarders: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    testGated(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  initialize(
    gatewayTokenContract: PromiseOrValue<string>,
    gatekeeperNetwork: PromiseOrValue<BigNumberish>,
    trustedForwarders: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isTrustedForwarder(
    forwarder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  testGated(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    initialize(
      gatewayTokenContract: PromiseOrValue<string>,
      gatekeeperNetwork: PromiseOrValue<BigNumberish>,
      trustedForwarders: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    testGated(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "Success()"(): SuccessEventFilter;
    Success(): SuccessEventFilter;
  };

  estimateGas: {
    initialize(
      gatewayTokenContract: PromiseOrValue<string>,
      gatekeeperNetwork: PromiseOrValue<BigNumberish>,
      trustedForwarders: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    testGated(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    initialize(
      gatewayTokenContract: PromiseOrValue<string>,
      gatekeeperNetwork: PromiseOrValue<BigNumberish>,
      trustedForwarders: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    testGated(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}