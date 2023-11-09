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
  StubMultisig,
  StubMultisigInterface,
} from "../../../test/contracts/StubMultisig";

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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "reassignOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516101b63803806101b683398101604081905261002f91610058565b600080546001600160a01b0319166001600160a01b039390931692909217909155600155610092565b6000806040838503121561006b57600080fd5b82516001600160a01b038116811461008257600080fd5b6020939093015192949293505050565b610115806100a16000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063c93f9b6314602d575b600080fd5b603c603836600460b1565b603e565b005b60005460015460405163a8fa8e0d60e01b81523060048201526001600160a01b0384811660248301526044820192909252911690819063a8fa8e0d90606401600060405180830381600087803b158015609657600080fd5b505af115801560a9573d6000803e3d6000fd5b505050505050565b60006020828403121560c257600080fd5b81356001600160a01b038116811460d857600080fd5b939250505056fea2646970667358221220f3eece08266b4e05e833295c68c9413b3c90c9c0da8ca89fd21a3540f1f3d90064736f6c63430008130033";

type StubMultisigConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StubMultisigConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StubMultisig__factory extends ContractFactory {
  constructor(...args: StubMultisigConstructorParams) {
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
  ): Promise<StubMultisig> {
    return super.deploy(
      gatewayTokenContract,
      gatekeeperNetwork,
      overrides || {}
    ) as Promise<StubMultisig>;
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
  override attach(address: string): StubMultisig {
    return super.attach(address) as StubMultisig;
  }
  override connect(signer: Signer): StubMultisig__factory {
    return super.connect(signer) as StubMultisig__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StubMultisigInterface {
    return new utils.Interface(_abi) as StubMultisigInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StubMultisig {
    return new Contract(address, _abi, signerOrProvider) as StubMultisig;
  }
}
