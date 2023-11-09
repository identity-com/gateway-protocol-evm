/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  GatewayTokenClientERC2771Test,
  GatewayTokenClientERC2771TestInterface,
} from "../../../../test/contracts/GatewayTokenClientERC2771UpgradeableTest.sol/GatewayTokenClientERC2771Test";

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
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "Success",
    type: "event",
  },
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
      {
        internalType: "address[]",
        name: "trustedForwarders",
        type: "address[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "forwarder",
        type: "address",
      },
    ],
    name: "isTrustedForwarder",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
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
  "0x608060405234801561001057600080fd5b506105d0806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063572b6c05146100465780636d91457a14610086578063968f76bd1461009b575b600080fd5b610072610054366004610444565b6001600160a01b031660009081526033602052604090205460ff1690565b604051901515815260200160405180910390f35b610099610094366004610466565b6100a3565b005b6100996101c1565b600054610100900460ff16158080156100c35750600054600160ff909116105b806100dd5750303b1580156100dd575060005460ff166001145b6101455760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff191660011790558015610168576000805461ff0019166101001790555b610174858585856102a3565b80156101ba576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050505050565b6034546001600160a01b03168063ff17e2326101db6102fa565b6035546040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381865afa158015610227573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024b91906104f0565b610277576034546040516355ec9bfb60e11b81526001600160a01b03909116600482015260240161013c565b6040517f395a9ab3d1230297d931e1fa224ca597ca0e45f620c1aeb74b512bfcc6f66aab90600090a150565b600054610100900460ff166102ca5760405162461bcd60e51b815260040161013c90610512565b603480546001600160a01b0319166001600160a01b03861617905560358390556102f48282610324565b50505050565b3360009081526033602052604081205460ff161561031f575060131936013560601c90565b503390565b600054610100900460ff1661034b5760405162461bcd60e51b815260040161013c90610512565b610353610361565b61035d828261038a565b5050565b600054610100900460ff166103885760405162461bcd60e51b815260040161013c90610512565b565b600054610100900460ff166103b15760405162461bcd60e51b815260040161013c90610512565b60005b81811015610423576001603360008585858181106103d4576103d461055d565b90506020020160208101906103e99190610444565b6001600160a01b031681526020810191909152604001600020805460ff19169115159190911790558061041b81610573565b9150506103b4565b505050565b80356001600160a01b038116811461043f57600080fd5b919050565b60006020828403121561045657600080fd5b61045f82610428565b9392505050565b6000806000806060858703121561047c57600080fd5b61048585610428565b935060208501359250604085013567ffffffffffffffff808211156104a957600080fd5b818701915087601f8301126104bd57600080fd5b8135818111156104cc57600080fd5b8860208260051b85010111156104e157600080fd5b95989497505060200194505050565b60006020828403121561050257600080fd5b8151801515811461045f57600080fd5b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b60006001820161059357634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212200066dcb440a294cbaa47eff84459a826cc54037cf9879828564a3459b2e29c6964736f6c63430008130033";

type GatewayTokenClientERC2771TestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GatewayTokenClientERC2771TestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GatewayTokenClientERC2771Test__factory extends ContractFactory {
  constructor(...args: GatewayTokenClientERC2771TestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GatewayTokenClientERC2771Test> {
    return super.deploy(
      overrides || {}
    ) as Promise<GatewayTokenClientERC2771Test>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GatewayTokenClientERC2771Test {
    return super.attach(address) as GatewayTokenClientERC2771Test;
  }
  override connect(signer: Signer): GatewayTokenClientERC2771Test__factory {
    return super.connect(signer) as GatewayTokenClientERC2771Test__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GatewayTokenClientERC2771TestInterface {
    return new utils.Interface(_abi) as GatewayTokenClientERC2771TestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GatewayTokenClientERC2771Test {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as GatewayTokenClientERC2771Test;
  }
}
