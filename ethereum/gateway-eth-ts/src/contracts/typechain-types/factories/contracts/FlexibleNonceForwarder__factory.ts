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
  FlexibleNonceForwarder,
  FlexibleNonceForwarderInterface,
} from "../../contracts/FlexibleNonceForwarder";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockAgeTolerance",
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
        name: "signer",
        type: "address",
      },
      {
        internalType: "address",
        name: "expectedSigner",
        type: "address",
      },
    ],
    name: "FlexibleNonceForwarder__InvalidSigner",
    type: "error",
  },
  {
    inputs: [],
    name: "FlexibleNonceForwarder__TxAlreadySeen",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "blockAgeTolerance",
        type: "uint256",
      },
    ],
    name: "FlexibleNonceForwarder__TxTooOld",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "ForwardResult",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
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
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct IForwarder.ForwardRequest",
        name: "req",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "getNonce",
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
] as const;

const _bytecode =
  "0x61016060405234801561001157600080fd5b50604051610fb9380380610fb983398101604081905261003091610143565b604080518082018252601681527f466c657869626c654e6f6e6365466f7277617264657200000000000000000000602080830191825283518085019094526005845264302e302e3160d81b908401528151902060e08190527fae209a0b48f21c054280f2455d32cf309387644879d9acbd8ffc1991638118856101008190524660a0529192917f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6101268184846040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b6080523060c052610120525050600160005550506101405261015c565b60006020828403121561015557600080fd5b5051919050565b60805160a05160c05160e051610100516101205161014051610dfc6101bd600039600081816104e801526105830152600061088f015260006108de015260006108b9015260006108120152600061083c015260006108660152610dfc6000f3fe6080604052600436106100295760003560e01c80632d0335ab1461002e57806347153f8214610077575b600080fd5b34801561003a57600080fd5b50610064610049366004610b75565b6001600160a01b031660009081526001602052604090205490565b6040519081526020015b60405180910390f35b61008a610085366004610ba5565b610098565b60405161006e929190610c74565b600060606100a46101dd565b6100af85858561023c565b6100b885610648565b6000806100cb6040880160208901610b75565b6001600160a01b0316606088013560408901356100eb60a08b018b610cb0565b6100f860208d018d610b75565b60405160200161010a93929190610cf7565b60408051601f198184030181529082905261012491610d1d565b600060405180830381858888f193505050503d8060008114610162576040519150601f19603f3d011682016040523d82523d6000602084013e610167565b606091505b5090925090508161017a57805160208201fd5b61018960406060890135610d4f565b5a1161019157fe5b60405182151581527fed0603e97c834a591ced7b3c6ce727a087f9d1748098dc815b12a2516993d68c9060200160405180910390a190925090506101d56001600055565b935093915050565b600260005414156102355760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064015b60405180910390fd5b6002600055565b600061034e83838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061034892507fdd8f4b70b0f4393e889bd39128a30628a78b61816a9eb8199759e7a349657e4891506102ab90506020890189610b75565b6102bb60408a0160208b01610b75565b60408a013560608b013560808c01356102d760a08e018e610cb0565b6040516102e5929190610d71565b6040805191829003822060208301989098526001600160a01b0396871690820152949093166060850152608084019190915260a083015260c082015260e0810191909152610100016040516020818303038152906040528051906020012061066f565b906106c3565b905061035d6020850185610b75565b6001600160a01b0316816001600160a01b0316146103af57806103836020860186610b75565b604051635e4cf60960e11b81526001600160a01b0392831660048201529116602482015260440161022c565b6080840135600160006103c56020880188610b75565b6001600160a01b031681526020810191909152604001600020541415610458576103f460808501356001610d81565b600160006104056020880188610b75565b6001600160a01b03168152602080820192909252604001600090812092909255439160019161043690880188610b75565b6001600160a01b031681526020810191909152604001600020600101556105c5565b600160006104696020870187610b75565b6001600160a01b03166001600160a01b0316815260200190815260200160002060020160008560800135815260200190815260200160002060000183836040516104b4929190610d71565b9081526040519081900360200190205460ff16156104e557604051630c3294e760e41b815260040160405180910390fd5b437f0000000000000000000000000000000000000000000000000000000000000000600160006105186020890189610b75565b6001600160a01b03166001600160a01b03168152602001908152602001600020600101546105469190610d81565b10156105c5576001600061055d6020870187610b75565b6001600160a01b03166001600160a01b03168152602001908152602001600020600101547f00000000000000000000000000000000000000000000000000000000000000006040516264f5c360e21b815260040161022c929190918252602082015260400190565b60018060006105d76020880188610b75565b6001600160a01b03166001600160a01b031681526020019081526020016000206002016000866080013581526020019081526020016000206000018484604051610622929190610d71565b908152604051908190036020019020805491151560ff1990921691909117905550505050565b806040013534111561066c5761066c610665604083013534610d99565b33906106e7565b50565b60006106bd61067c610805565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b92915050565b60008060006106d2858561092c565b915091506106df81610972565b509392505050565b804710156107375760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a20696e73756666696369656e742062616c616e6365000000604482015260640161022c565b6000826001600160a01b03168260405160006040518083038185875af1925050503d8060008114610784576040519150601f19603f3d011682016040523d82523d6000602084013e610789565b606091505b50509050806108005760405162461bcd60e51b815260206004820152603a60248201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260448201527f6563697069656e74206d61792068617665207265766572746564000000000000606482015260840161022c565b505050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561085e57507f000000000000000000000000000000000000000000000000000000000000000046145b1561088857507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6000808251604114156109635760208301516040840151606085015160001a61095787828585610abb565b9450945050505061096b565b506000905060025b9250929050565b600081600481111561098657610986610db0565b141561098f5750565b60018160048111156109a3576109a3610db0565b14156109ec5760405162461bcd60e51b815260206004820152601860248201527745434453413a20696e76616c6964207369676e617475726560401b604482015260640161022c565b6002816004811115610a0057610a00610db0565b1415610a4e5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161022c565b6003816004811115610a6257610a62610db0565b141561066c5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b606482015260840161022c565b6000806fa2a8918ca85bafe22016d0b997e4df60600160ff1b03831115610ae85750600090506003610b6c565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610b3c573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610b6557600060019250925050610b6c565b9150600090505b94509492505050565b600060208284031215610b8757600080fd5b81356001600160a01b0381168114610b9e57600080fd5b9392505050565b600080600060408486031215610bba57600080fd5b833567ffffffffffffffff80821115610bd257600080fd5b9085019060c08288031215610be657600080fd5b90935060208501359080821115610bfc57600080fd5b818601915086601f830112610c1057600080fd5b813581811115610c1f57600080fd5b876020828501011115610c3157600080fd5b6020830194508093505050509250925092565b60005b83811015610c5f578181015183820152602001610c47565b83811115610c6e576000848401525b50505050565b82151581526040602082015260008251806040840152610c9b816060850160208701610c44565b601f01601f1916919091016060019392505050565b6000808335601e19843603018112610cc757600080fd5b83018035915067ffffffffffffffff821115610ce257600080fd5b60200191503681900382131561096b57600080fd5b8284823760609190911b6bffffffffffffffffffffffff19169101908152601401919050565b60008251610d2f818460208701610c44565b9190910192915050565b634e487b7160e01b600052601160045260246000fd5b600082610d6c57634e487b7160e01b600052601260045260246000fd5b500490565b8183823760009101908152919050565b60008219821115610d9457610d94610d39565b500190565b600082821015610dab57610dab610d39565b500390565b634e487b7160e01b600052602160045260246000fdfea2646970667358221220a46bef00eab6b67acc38a7b47bf487597a5d4922653e9c25e0928715cb628ec164736f6c63430008090033";

type FlexibleNonceForwarderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FlexibleNonceForwarderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FlexibleNonceForwarder__factory extends ContractFactory {
  constructor(...args: FlexibleNonceForwarderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    blockAgeTolerance: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FlexibleNonceForwarder> {
    return super.deploy(
      blockAgeTolerance,
      overrides || {}
    ) as Promise<FlexibleNonceForwarder>;
  }
  override getDeployTransaction(
    blockAgeTolerance: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(blockAgeTolerance, overrides || {});
  }
  override attach(address: string): FlexibleNonceForwarder {
    return super.attach(address) as FlexibleNonceForwarder;
  }
  override connect(signer: Signer): FlexibleNonceForwarder__factory {
    return super.connect(signer) as FlexibleNonceForwarder__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FlexibleNonceForwarderInterface {
    return new utils.Interface(_abi) as FlexibleNonceForwarderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FlexibleNonceForwarder {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as FlexibleNonceForwarder;
  }
}
