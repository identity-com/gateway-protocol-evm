import { Provider } from "@ethersproject/providers";
import {
  GatewayStaking__factory,
  GatewayStaking as StakingType,
} from "../contracts/typechain-types";
import { ContractTransaction, Wallet, ethers } from "ethers";

export class GatewayStaking {
  private gatewayStakingContract: StakingType;
  readonly providerOrWallet: Provider | Wallet;

  constructor(
    // ethers.js requires a Wallet instead of Signer for the _signTypedData function, until v6
    providerOrWallet: Provider | Wallet,
    defaultGatewayStakingAddress: string
  ) {
    this.gatewayStakingContract = GatewayStaking__factory.connect(
      defaultGatewayStakingAddress,
      providerOrWallet
    );
    this.providerOrWallet = providerOrWallet;
  }

  async hasMinimumGatekeeperStake(address: string): Promise<boolean> {
    return await this.gatewayStakingContract.hasMinimumGatekeeperStake(
      address,
      { gasLimit: 300000 }
    );
  }

  async depositStake(amount: bigint): Promise<ContractTransaction> {
    return await this.gatewayStakingContract.depositStake(amount, {
      gasLimit: 300000,
    });
  }

  async depositStakeFor(
    amount: bigint,
    recipient: string
  ): Promise<ContractTransaction> {
    return await this.gatewayStakingContract.deposit(amount, recipient);
  }

  async withdrawStake(amount: bigint): Promise<ContractTransaction> {
    return await this.gatewayStakingContract.withdrawStake(amount, {
      gasLimit: 300000,
    });
  }

  async withdrawStakeFor(
    amount: bigint,
    stakeOwner: string
  ): Promise<ContractTransaction> {
    return await this.gatewayStakingContract.redeem(
      amount,
      stakeOwner,
      stakeOwner
    );
  }
}