/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  InternalTokenApproval,
  InternalTokenApprovalInterface,
} from "../../../contracts/library/InternalTokenApproval";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "gatewayTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
    ],
    name: "setApproval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610101806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063f453600714602d575b600080fd5b60716038366004608e565b336000908152602081815260408083206001600160a01b0397881684528252808320959096168252939093529290912090815560010155565b005b80356001600160a01b0381168114608957600080fd5b919050565b6000806000806080858703121560a357600080fd5b60aa856073565b935060b6602086016073565b9396939550505050604082013591606001359056fea2646970667358221220287bbcb5650a5f150800c5ac6b28b890146b63e8b35bebd5c33698f5b50eb5a764736f6c63430008130033";

type InternalTokenApprovalConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: InternalTokenApprovalConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class InternalTokenApproval__factory extends ContractFactory {
  constructor(...args: InternalTokenApprovalConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<InternalTokenApproval> {
    return super.deploy(overrides || {}) as Promise<InternalTokenApproval>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): InternalTokenApproval {
    return super.attach(address) as InternalTokenApproval;
  }
  override connect(signer: Signer): InternalTokenApproval__factory {
    return super.connect(signer) as InternalTokenApproval__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InternalTokenApprovalInterface {
    return new utils.Interface(_abi) as InternalTokenApprovalInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): InternalTokenApproval {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as InternalTokenApproval;
  }
}
