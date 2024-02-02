import hre, { run } from "hardhat";
import { DefenderRelayProvider, DefenderRelaySigner } from "@openzeppelin/defender-relay-client/lib/ethers";
import { fromChainId } from '@openzeppelin/defender-base-client';
import { AdminClient } from '@openzeppelin/defender-admin-client';
import { ethers } from 'hardhat';

export async function loadRelayerSigner() {
  const credentials = {apiKey: process.env.DEFENDER_RELAY_API_KEY!, apiSecret: process.env.DEFENDER_RELAY_SECRET!};
  const provider = new DefenderRelayProvider(credentials);
  return new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
}


export async function addContractToAdmin(contractAddress: string, name: string) {
  const client = new AdminClient({ apiKey: process.env.DEFENDER_API_KEY!, apiSecret: process.env.DEFENDER_SECRET! });

  await client.addContract({
    network: fromChainId(hre.network.config.chainId!)!!,
    address: contractAddress,
    name
  });
}

export async function getContractFromDefenderByName(contractName: string) {
  const client = new AdminClient({ apiKey: process.env.DEFENDER_API_KEY!, apiSecret: process.env.DEFENDER_SECRET! });

  const contracts = (await client.listContracts()).filter(contract => contract.name === contractName);

  if (contracts.length){
    return contracts[0].address;
  }
  return
}

export async function getDeploymentSigner() {
  const shouldUseDefender = process.env.SHOULD_USE_DEFENDER!.toLowerCase() == "true";

  if(shouldUseDefender) {
    return await loadRelayerSigner();
  } else {
    return new ethers.Wallet(process.env.LOCAL_DEPLOY_PRIVATE_KEY!);
  }
}

export async function verify(contractAddress: string, constructorArgs: any[], contract?: string) {
  console.log("Verifying contract...");
  try {
      await run("verify:verify", {
          address: contractAddress,
          constructorArguments: constructorArgs,
          contract
      });
  } catch (e: any) {
      if (e.message.toLowerCase().includes("already verified")) {
          console.log("Already verified!");
      } else {
          console.log(e);
      }
  }
};

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));