/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  GatewayTokenClientTest,
  GatewayTokenClientTestInterface,
} from "../../contracts/GatewayTokenClientTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "gatewayTokenContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "gatekeeperNetwork",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
  {
    anonymous: false,
    inputs: [],
    name: "Success",
    type: "event",
  },
  {
    inputs: [],
    name: "testGated",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161022038038061022083398101604081905261002f91610058565b600080546001600160a01b0319166001600160a01b039390931692909217909155600155610092565b6000806040838503121561006b57600080fd5b82516001600160a01b038116811461008257600080fd5b6020939093015192949293505050565b61017f806100a16000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063968f76bd14610030575b600080fd5b61003861003a565b005b600054600154604051600162740ee760e11b03198152336004820152602481018290526001600160a01b03909216918290819063ff17e2329060440160206040518083038186803b15801561008e57600080fd5b505afa1580156100a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100c69190610120565b6100f2576040516355ec9bfb60e11b81526001600160a01b038416600482015260240160405180910390fd5b6040517f395a9ab3d1230297d931e1fa224ca597ca0e45f620c1aeb74b512bfcc6f66aab90600090a1505050565b60006020828403121561013257600080fd5b8151801515811461014257600080fd5b939250505056fea26469706673582212207b1fbab16fcd6900f56ecbc562d69ca65492efd21933f660b1f1809dedade2c564736f6c63430008090033";

type GatewayTokenClientTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GatewayTokenClientTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GatewayTokenClientTest__factory extends ContractFactory {
  constructor(...args: GatewayTokenClientTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    gatewayTokenContract: PromiseOrValue<string>,
    gatekeeperNetwork: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GatewayTokenClientTest> {
    return super.deploy(
      gatewayTokenContract,
      gatekeeperNetwork,
      overrides || {}
    ) as Promise<GatewayTokenClientTest>;
  }
  override getDeployTransaction(
    gatewayTokenContract: PromiseOrValue<string>,
    gatekeeperNetwork: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      gatewayTokenContract,
      gatekeeperNetwork,
      overrides || {}
    );
  }
  override attach(address: string): GatewayTokenClientTest {
    return super.attach(address) as GatewayTokenClientTest;
  }
  override connect(signer: Signer): GatewayTokenClientTest__factory {
    return super.connect(signer) as GatewayTokenClientTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GatewayTokenClientTestInterface {
    return new utils.Interface(_abi) as GatewayTokenClientTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GatewayTokenClientTest {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as GatewayTokenClientTest;
  }
}
