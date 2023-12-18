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
  DummyBrokenERC20,
  DummyBrokenERC20Interface,
} from "../../../test/contracts/DummyBrokenERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000e1638038062000e1683398101604081905262000034916200020a565b83838383838360036200004883826200032d565b5060046200005782826200032d565b5050506200006c81836200007a60201b60201c565b505050505050505062000421565b6001600160a01b038216620000d55760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000e99190620003f9565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200016d57600080fd5b81516001600160401b03808211156200018a576200018a62000145565b604051601f8301601f19908116603f01168101908282118183101715620001b557620001b562000145565b81604052838152602092508683858801011115620001d257600080fd5b600091505b83821015620001f65785820183015181830184015290820190620001d7565b600093810190920192909252949350505050565b600080600080608085870312156200022157600080fd5b84516001600160401b03808211156200023957600080fd5b62000247888389016200015b565b955060208701519150808211156200025e57600080fd5b506200026d878288016200015b565b60408701516060880151919550935090506001600160a01b03811681146200029457600080fd5b939692955090935050565b600181811c90821680620002b457607f821691505b602082108103620002d557634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200014057600081815260208120601f850160051c81016020861015620003045750805b601f850160051c820191505b81811015620003255782815560010162000310565b505050505050565b81516001600160401b0381111562000349576200034962000145565b62000361816200035a84546200029f565b84620002db565b602080601f831160018114620003995760008415620003805750858301515b600019600386901b1c1916600185901b17855562000325565b600085815260208120601f198616915b82811015620003ca57888601518255948401946001909101908401620003a9565b5085821015620003e95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b808201808211156200041b57634e487b7160e01b600052601160045260246000fd5b92915050565b6109e580620004316000396000f3fe608060405234801561001057600080fd5b50600436106100bf5760003560e01c806342966c681161007c57806342966c681461015057806370a082311461016557806379cc67901461018e57806395d89b41146101a1578063a457c2d7146101a9578063a9059cbb146101bc578063dd62ed3e146101cf57600080fd5b806306fdde03146100c4578063095ea7b3146100e257806318160ddd1461010557806323b872dd14610117578063313ce5671461012e578063395093511461013d575b600080fd5b6100cc6101e2565b6040516100d99190610816565b60405180910390f35b6100f56100f0366004610880565b610274565b60405190151581526020016100d9565b6002545b6040519081526020016100d9565b6100f56101253660046108aa565b60009392505050565b604051601281526020016100d9565b6100f561014b366004610880565b61028e565b61016361015e3660046108e6565b6102b0565b005b6101096101733660046108ff565b6001600160a01b031660009081526020819052604090205490565b61016361019c366004610880565b6102bd565b6100cc6102d6565b6100f56101b7366004610880565b6102e5565b6100f56101ca366004610880565b610370565b6101096101dd366004610921565b61037e565b6060600380546101f190610954565b80601f016020809104026020016040519081016040528092919081815260200182805461021d90610954565b801561026a5780601f1061023f5761010080835404028352916020019161026a565b820191906000526020600020905b81548152906001019060200180831161024d57829003601f168201915b5050505050905090565b6000336102828185856103a9565b60019150505b92915050565b6000336102828185856102a1838361037e565b6102ab919061098e565b6103a9565b6102ba33826104ce565b50565b6102c88233836105f8565b6102d282826104ce565b5050565b6060600480546101f190610954565b600033816102f3828661037e565b9050838110156103585760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b61036582868684036103a9565b506001949350505050565b600033610282818585610672565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b03831661040b5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161034f565b6001600160a01b03821661046c5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161034f565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b03821661052e5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b606482015260840161034f565b6001600160a01b038216600090815260208190526040902054818110156105a25760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b606482015260840161034f565b6001600160a01b0383166000818152602081815260408083208686039055600280548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91016104c1565b6000610604848461037e565b9050600019811461066c578181101561065f5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161034f565b61066c84848484036103a9565b50505050565b6001600160a01b0383166106d65760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161034f565b6001600160a01b0382166107385760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161034f565b6001600160a01b038316600090815260208190526040902054818110156107b05760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161034f565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a361066c565b600060208083528351808285015260005b8181101561084357858101830151858201604001528201610827565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461087b57600080fd5b919050565b6000806040838503121561089357600080fd5b61089c83610864565b946020939093013593505050565b6000806000606084860312156108bf57600080fd5b6108c884610864565b92506108d660208501610864565b9150604084013590509250925092565b6000602082840312156108f857600080fd5b5035919050565b60006020828403121561091157600080fd5b61091a82610864565b9392505050565b6000806040838503121561093457600080fd5b61093d83610864565b915061094b60208401610864565b90509250929050565b600181811c9082168061096857607f821691505b60208210810361098857634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561028857634e487b7160e01b600052601160045260246000fdfea26469706673582212206e1c068eb31633c0760ca144720563317a6776fef57961f474dcec4176759c2664736f6c63430008130033";

type DummyBrokenERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DummyBrokenERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DummyBrokenERC20__factory extends ContractFactory {
  constructor(...args: DummyBrokenERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    initialSupply: PromiseOrValue<BigNumberish>,
    owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DummyBrokenERC20> {
    return super.deploy(
      name,
      symbol,
      initialSupply,
      owner,
      overrides || {}
    ) as Promise<DummyBrokenERC20>;
  }
  override getDeployTransaction(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    initialSupply: PromiseOrValue<BigNumberish>,
    owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name,
      symbol,
      initialSupply,
      owner,
      overrides || {}
    );
  }
  override attach(address: string): DummyBrokenERC20 {
    return super.attach(address) as DummyBrokenERC20;
  }
  override connect(signer: Signer): DummyBrokenERC20__factory {
    return super.connect(signer) as DummyBrokenERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DummyBrokenERC20Interface {
    return new utils.Interface(_abi) as DummyBrokenERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DummyBrokenERC20 {
    return new Contract(address, _abi, signerOrProvider) as DummyBrokenERC20;
  }
}