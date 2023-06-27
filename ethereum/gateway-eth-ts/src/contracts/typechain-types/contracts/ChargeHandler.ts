/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  Signer,
  utils,
} from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export type ChargeStruct = {
  value: PromiseOrValue<BigNumberish>;
  chargeType: PromiseOrValue<BigNumberish>;
  token: PromiseOrValue<string>;
  tokenSender: PromiseOrValue<string>;
  recipient: PromiseOrValue<string>;
};

export type ChargeStructOutput = [BigNumber, number, string, string, string] & {
  value: BigNumber;
  chargeType: number;
  token: string;
  tokenSender: string;
  recipient: string;
};

export interface ChargeHandlerInterface extends utils.Interface {
  functions: {};

  events: {
    "ChargePaid(tuple)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ChargePaid"): EventFragment;
}

export interface ChargePaidEventObject {
  arg0: ChargeStructOutput;
}
export type ChargePaidEvent = TypedEvent<
  [ChargeStructOutput],
  ChargePaidEventObject
>;

export type ChargePaidEventFilter = TypedEventFilter<ChargePaidEvent>;

export interface ChargeHandler extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ChargeHandlerInterface;

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

  functions: {};

  callStatic: {};

  filters: {
    "ChargePaid(tuple)"(arg0?: null): ChargePaidEventFilter;
    ChargePaid(arg0?: null): ChargePaidEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}
