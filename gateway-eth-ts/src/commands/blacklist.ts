/* eslint-disable @typescript-eslint/require-await */
import { Command, Flags } from "@oclif/core";
import { BigNumber, utils, Wallet } from "ethers";
import { BaseProvider } from "@ethersproject/providers";
import { GatewayTokenController } from "../contracts";
import {
  privateKeyFlag,
  networkFlag,
  gasPriceFeeFlag,
  gatewayTokenControllerFlag,
  confirmationsFlag,
} from "../utils/flags";
import { TxBase } from "../utils/tx";
import { mnemonicSigner, privateKeySigner } from "../utils/signer";

export default class Blacklist extends Command {
  static description = "Blacklist user globaly in the gateway token system";

  static examples = [
    `$ gateway blacklist 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94
		`,
  ];

  static flags = {
    help: Flags.help({ char: "h" }),
    privateKey: privateKeyFlag(),
    gatewayTokenController: gatewayTokenControllerFlag(),
    network: networkFlag(),
    gasPriceFee: gasPriceFeeFlag(),
    confirmations: confirmationsFlag(),
  };

  static args = [
    {
      name: "address",
      required: true,
      description: "User ETH address to blacklist",
      parse: async (input: string): Promise<string> =>
        utils.isAddress(input) ? input : null,
    },
  ];

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Blacklist);
    const pk = flags.privateKey;
    const provider: BaseProvider = flags.network;
    const user: string = args.address;
    const confirmations = flags.confirmations;

    const signer: Wallet = utils.isValidMnemonic(pk)
      ? mnemonicSigner(pk, provider)
      : privateKeySigner(pk, provider);

    const gatewayTokenAddress: string = flags.gatewayTokenController;
    const controller = new GatewayTokenController(signer, gatewayTokenAddress);

    this.log(`Blacklisting user: ${user}`);

    const gasPrice = flags.gasPriceFee;
    const gasLimit = await controller.contract.estimateGas.blacklist(user);

    const txParams: TxBase = {
      gasLimit: gasLimit,
      gasPrice: BigNumber.from(utils.parseUnits(String(gasPrice), "gwei")),
    };

    const tx: any = await (confirmations > 0
      ? (await controller.blacklist(user, txParams)).wait(confirmations)
      : controller.blacklist(user, txParams));

    this.log(
      `Blacklisted user with ${user} address. TxHash: ${
        confirmations > 0 ? tx.transactionHash : tx.hash
      }`
    );
  }
}
