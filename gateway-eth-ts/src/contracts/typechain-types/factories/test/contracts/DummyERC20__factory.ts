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
  DummyERC20,
  DummyERC20Interface,
} from "../../../test/contracts/DummyERC20";

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
        name: "from",
        type: "address",
      },
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
  "0x60806040523480156200001157600080fd5b5060405162000e2b38038062000e2b83398101604081905262000034916200020a565b83838383838360036200004883826200032d565b5060046200005782826200032d565b5050506200006c81836200007a60201b60201c565b505050505050505062000421565b6001600160a01b038216620000d55760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000e99190620003f9565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200016d57600080fd5b81516001600160401b03808211156200018a576200018a62000145565b604051601f8301601f19908116603f01168101908282118183101715620001b557620001b562000145565b81604052838152602092508683858801011115620001d257600080fd5b600091505b83821015620001f65785820183015181830184015290820190620001d7565b600093810190920192909252949350505050565b600080600080608085870312156200022157600080fd5b84516001600160401b03808211156200023957600080fd5b62000247888389016200015b565b955060208701519150808211156200025e57600080fd5b506200026d878288016200015b565b60408701516060880151919550935090506001600160a01b03811681146200029457600080fd5b939692955090935050565b600181811c90821680620002b457607f821691505b602082108103620002d557634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200014057600081815260208120601f850160051c81016020861015620003045750805b601f850160051c820191505b81811015620003255782815560010162000310565b505050505050565b81516001600160401b0381111562000349576200034962000145565b62000361816200035a84546200029f565b84620002db565b602080601f831160018114620003995760008415620003805750858301515b600019600386901b1c1916600185901b17855562000325565b600085815260208120601f198616915b82811015620003ca57888601518255948401946001909101908401620003a9565b5085821015620003e95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b808201808211156200041b57634e487b7160e01b600052601160045260246000fd5b92915050565b6109fa80620004316000396000f3fe608060405234801561001057600080fd5b50600436106100bf5760003560e01c806342966c681161007c57806342966c681461014c57806370a082311461016157806379cc67901461018a57806395d89b411461019d578063a457c2d7146101a5578063a9059cbb146101b8578063dd62ed3e146101cb57600080fd5b806306fdde03146100c4578063095ea7b3146100e257806318160ddd1461010557806323b872dd14610117578063313ce5671461012a5780633950935114610139575b600080fd5b6100cc6101de565b6040516100d9919061082b565b60405180910390f35b6100f56100f0366004610895565b610270565b60405190151581526020016100d9565b6002545b6040519081526020016100d9565b6100f56101253660046108bf565b61028a565b604051601281526020016100d9565b6100f5610147366004610895565b6102ae565b61015f61015a3660046108fb565b6102d0565b005b61010961016f366004610914565b6001600160a01b031660009081526020819052604090205490565b61015f610198366004610895565b6102dd565b6100cc6102f6565b6100f56101b3366004610895565b610305565b6100f56101c6366004610895565b610385565b6101096101d9366004610936565b610393565b6060600380546101ed90610969565b80601f016020809104026020016040519081016040528092919081815260200182805461021990610969565b80156102665780601f1061023b57610100808354040283529160200191610266565b820191906000526020600020905b81548152906001019060200180831161024957829003601f168201915b5050505050905090565b60003361027e8185856103be565b60019150505b92915050565b6000336102988582856104e3565b6102a385858561055d565b506001949350505050565b60003361027e8185856102c18383610393565b6102cb91906109a3565b6103be565b6102da3382610701565b50565b6102e88233836104e3565b6102f28282610701565b5050565b6060600480546101ed90610969565b600033816103138286610393565b9050838110156103785760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102a382868684036103be565b60003361027e81858561055d565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166104205760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161036f565b6001600160a01b0382166104815760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161036f565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b60006104ef8484610393565b90506000198114610557578181101561054a5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161036f565b61055784848484036103be565b50505050565b6001600160a01b0383166105c15760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161036f565b6001600160a01b0382166106235760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161036f565b6001600160a01b0383166000908152602081905260409020548181101561069b5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161036f565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3610557565b6001600160a01b0382166107615760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b606482015260840161036f565b6001600160a01b038216600090815260208190526040902054818110156107d55760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b606482015260840161036f565b6001600160a01b0383166000818152602081815260408083208686039055600280548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91016104d6565b600060208083528351808285015260005b818110156108585785810183015185820160400152820161083c565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461089057600080fd5b919050565b600080604083850312156108a857600080fd5b6108b183610879565b946020939093013593505050565b6000806000606084860312156108d457600080fd5b6108dd84610879565b92506108eb60208501610879565b9150604084013590509250925092565b60006020828403121561090d57600080fd5b5035919050565b60006020828403121561092657600080fd5b61092f82610879565b9392505050565b6000806040838503121561094957600080fd5b61095283610879565b915061096060208401610879565b90509250929050565b600181811c9082168061097d57607f821691505b60208210810361099d57634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561028457634e487b7160e01b600052601160045260246000fdfea2646970667358221220a4f6d8f87994bb45cce8465883fb72247a76c429782507c1c2ffe7dbe390e1ac64736f6c63430008130033";

type DummyERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DummyERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DummyERC20__factory extends ContractFactory {
  constructor(...args: DummyERC20ConstructorParams) {
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
  ): Promise<DummyERC20> {
    return super.deploy(
      name,
      symbol,
      initialSupply,
      owner,
      overrides || {}
    ) as Promise<DummyERC20>;
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
  override attach(address: string): DummyERC20 {
    return super.attach(address) as DummyERC20;
  }
  override connect(signer: Signer): DummyERC20__factory {
    return super.connect(signer) as DummyERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DummyERC20Interface {
    return new utils.Interface(_abi) as DummyERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DummyERC20 {
    return new Contract(address, _abi, signerOrProvider) as DummyERC20;
  }
}