/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  IsGated,
  IsGatedInterface,
} from "../../../contracts/IsGated.sol/IsGated";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "gatewayToken",
        type: "address",
      },
    ],
    name: "IsGated__InvalidGatewayToken",
    type: "error",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea26469706673582212203a886e22094e5dd593985db6ad4f90f8de0de96d263f4f945affd4489633091c64736f6c63430008090033";

type IsGatedConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: IsGatedConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class IsGated__factory extends ContractFactory {
  constructor(...args: IsGatedConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<IsGated> {
    return super.deploy(overrides || {}) as Promise<IsGated>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): IsGated {
    return super.attach(address) as IsGated;
  }
  override connect(signer: Signer): IsGated__factory {
    return super.connect(signer) as IsGated__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IsGatedInterface {
    return new utils.Interface(_abi) as IsGatedInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IsGated {
    return new Contract(address, _abi, signerOrProvider) as IsGated;
  }
}
