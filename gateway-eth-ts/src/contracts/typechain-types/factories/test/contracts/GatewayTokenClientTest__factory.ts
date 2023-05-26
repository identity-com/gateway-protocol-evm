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
import type { PromiseOrValue } from "../../../common";
import type {
  GatewayTokenClientTest,
  GatewayTokenClientTestInterface,
} from "../../../test/contracts/GatewayTokenClientTest";

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
  "0x608060405234801561001057600080fd5b5060405161022138038061022183398101604081905261002f91610058565b600080546001600160a01b0319166001600160a01b039390931692909217909155600155610092565b6000806040838503121561006b57600080fd5b82516001600160a01b038116811461008257600080fd5b6020939093015192949293505050565b610180806100a16000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063968f76bd14610030575b600080fd5b61003861003a565b005b600054600154604051600162740ee760e11b0319815233600482015260248101919091526001600160a01b0390911690819063ff17e2329060440160206040518083038186803b15801561008d57600080fd5b505afa1580156100a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100c59190610121565b6100f5576000546040516355ec9bfb60e11b81526001600160a01b03909116600482015260240160405180910390fd5b6040517f395a9ab3d1230297d931e1fa224ca597ca0e45f620c1aeb74b512bfcc6f66aab90600090a150565b60006020828403121561013357600080fd5b8151801515811461014357600080fd5b939250505056fea2646970667358221220051ec68cfdc409722fee472506fed0ec633bf283fb80d0da8405d8c60258a76264736f6c63430008090033";

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
