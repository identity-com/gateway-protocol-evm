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
  PayableOverrides,
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
} from "../common";

export interface FlagsStorageInterface extends utils.Interface {
  functions: {
    "addFlag(bytes32,uint8)": FunctionFragment;
    "addFlags(bytes32[],uint8[])": FunctionFragment;
    "flagIndexes(bytes32)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "isFlagSupported(bytes32)": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "removeFlag(bytes32)": FunctionFragment;
    "removeFlags(bytes32[])": FunctionFragment;
    "superAdmin()": FunctionFragment;
    "supportedFlagsMask()": FunctionFragment;
    "updateSuperAdmin(address)": FunctionFragment;
    "upgradeTo(address)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addFlag"
      | "addFlags"
      | "flagIndexes"
      | "initialize"
      | "isFlagSupported"
      | "proxiableUUID"
      | "removeFlag"
      | "removeFlags"
      | "superAdmin"
      | "supportedFlagsMask"
      | "updateSuperAdmin"
      | "upgradeTo"
      | "upgradeToAndCall"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addFlag",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "addFlags",
    values: [PromiseOrValue<BytesLike>[], PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "flagIndexes",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isFlagSupported",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeFlag",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeFlags",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "superAdmin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportedFlagsMask",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateSuperAdmin",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(functionFragment: "addFlag", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addFlags", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "flagIndexes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isFlagSupported",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "removeFlag", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeFlags",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "superAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportedFlagsMask",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSuperAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;

  events: {
    "AdminChanged(address,address)": EventFragment;
    "BeaconUpgraded(address)": EventFragment;
    "FlagAdded(bytes32,uint8)": EventFragment;
    "FlagRemoved(bytes32)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "SuperAdminUpdated(address,address)": EventFragment;
    "Upgraded(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FlagAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FlagRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SuperAdminUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}

export interface AdminChangedEventObject {
  previousAdmin: string;
  newAdmin: string;
}
export type AdminChangedEvent = TypedEvent<
  [string, string],
  AdminChangedEventObject
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export interface BeaconUpgradedEventObject {
  beacon: string;
}
export type BeaconUpgradedEvent = TypedEvent<
  [string],
  BeaconUpgradedEventObject
>;

export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;

export interface FlagAddedEventObject {
  flag: string;
  index: number;
}
export type FlagAddedEvent = TypedEvent<[string, number], FlagAddedEventObject>;

export type FlagAddedEventFilter = TypedEventFilter<FlagAddedEvent>;

export interface FlagRemovedEventObject {
  flag: string;
}
export type FlagRemovedEvent = TypedEvent<[string], FlagRemovedEventObject>;

export type FlagRemovedEventFilter = TypedEventFilter<FlagRemovedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface SuperAdminUpdatedEventObject {
  prevSuperAdmin: string;
  superAdmin: string;
}
export type SuperAdminUpdatedEvent = TypedEvent<
  [string, string],
  SuperAdminUpdatedEventObject
>;

export type SuperAdminUpdatedEventFilter =
  TypedEventFilter<SuperAdminUpdatedEvent>;

export interface UpgradedEventObject {
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface FlagsStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FlagsStorageInterface;

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
    addFlag(
      flag: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addFlags(
      flags: PromiseOrValue<BytesLike>[],
      indexes: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    flagIndexes(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    initialize(
      _superAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isFlagSupported(
      flag: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;

    removeFlag(
      flag: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeFlags(
      flags: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    superAdmin(overrides?: CallOverrides): Promise<[string]>;

    supportedFlagsMask(overrides?: CallOverrides): Promise<[BigNumber]>;

    updateSuperAdmin(
      newSuperAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addFlag(
    flag: PromiseOrValue<BytesLike>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addFlags(
    flags: PromiseOrValue<BytesLike>[],
    indexes: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  flagIndexes(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<number>;

  initialize(
    _superAdmin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isFlagSupported(
    flag: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  removeFlag(
    flag: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeFlags(
    flags: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  superAdmin(overrides?: CallOverrides): Promise<string>;

  supportedFlagsMask(overrides?: CallOverrides): Promise<BigNumber>;

  updateSuperAdmin(
    newSuperAdmin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeTo(
    newImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeToAndCall(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addFlag(
      flag: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    addFlags(
      flags: PromiseOrValue<BytesLike>[],
      indexes: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    flagIndexes(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<number>;

    initialize(
      _superAdmin: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    isFlagSupported(
      flag: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    removeFlag(
      flag: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeFlags(
      flags: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    superAdmin(overrides?: CallOverrides): Promise<string>;

    supportedFlagsMask(overrides?: CallOverrides): Promise<BigNumber>;

    updateSuperAdmin(
      newSuperAdmin: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AdminChanged(address,address)"(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;
    AdminChanged(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;

    "BeaconUpgraded(address)"(
      beacon?: PromiseOrValue<string> | null
    ): BeaconUpgradedEventFilter;
    BeaconUpgraded(
      beacon?: PromiseOrValue<string> | null
    ): BeaconUpgradedEventFilter;

    "FlagAdded(bytes32,uint8)"(
      flag?: PromiseOrValue<BytesLike> | null,
      index?: null
    ): FlagAddedEventFilter;
    FlagAdded(
      flag?: PromiseOrValue<BytesLike> | null,
      index?: null
    ): FlagAddedEventFilter;

    "FlagRemoved(bytes32)"(
      flag?: PromiseOrValue<BytesLike> | null
    ): FlagRemovedEventFilter;
    FlagRemoved(
      flag?: PromiseOrValue<BytesLike> | null
    ): FlagRemovedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "SuperAdminUpdated(address,address)"(
      prevSuperAdmin?: PromiseOrValue<string> | null,
      superAdmin?: PromiseOrValue<string> | null
    ): SuperAdminUpdatedEventFilter;
    SuperAdminUpdated(
      prevSuperAdmin?: PromiseOrValue<string> | null,
      superAdmin?: PromiseOrValue<string> | null
    ): SuperAdminUpdatedEventFilter;

    "Upgraded(address)"(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
    Upgraded(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
  };

  estimateGas: {
    addFlag(
      flag: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addFlags(
      flags: PromiseOrValue<BytesLike>[],
      indexes: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    flagIndexes(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _superAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isFlagSupported(
      flag: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    removeFlag(
      flag: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeFlags(
      flags: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    superAdmin(overrides?: CallOverrides): Promise<BigNumber>;

    supportedFlagsMask(overrides?: CallOverrides): Promise<BigNumber>;

    updateSuperAdmin(
      newSuperAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addFlag(
      flag: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addFlags(
      flags: PromiseOrValue<BytesLike>[],
      indexes: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    flagIndexes(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _superAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isFlagSupported(
      flag: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeFlag(
      flag: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeFlags(
      flags: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    superAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    supportedFlagsMask(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateSuperAdmin(
      newSuperAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
