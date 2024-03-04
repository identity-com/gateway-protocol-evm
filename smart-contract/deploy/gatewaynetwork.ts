import { addContractToAdmin, sleep, verify, getDeploymentSigner } from "./defender-utils";
import { Signer } from '@ethersproject/abstract-signer/src.ts'
import { ethers, upgrades } from 'hardhat';
import { BNB_TESTNET_CONTRACT_ADDRESSES } from "./utils";


async function main() {
    const testnetGatekeeperContractAddress = BNB_TESTNET_CONTRACT_ADDRESSES.gatekeeper;
    const testnetStakingContractAddress = BNB_TESTNET_CONTRACT_ADDRESSES.gatewayStaking;

    const signer: Signer = await getDeploymentSigner();
    const signerAddress = await signer.getAddress();

    const args = [signerAddress, testnetGatekeeperContractAddress, testnetStakingContractAddress];
        

    const GatewayNetworkContractFactory = await ethers.getContractFactory("GatewayNetwork", signer!);
    const gatewayNetworkContract = await upgrades.deployProxy(GatewayNetworkContractFactory, args, {kind: 'uups', unsafeAllow: ['state-variable-immutable']});

    await gatewayNetworkContract.deployed();
    const deployedAddress = gatewayNetworkContract.address;

    console.log(`GatewayNetwork deployed at ${deployedAddress}`);

    await sleep(6000);

    await verify(deployedAddress,[]);

    // Need to wait to avoid rate limit
    await sleep(2000);
    await addContractToAdmin(deployedAddress, "GatewayNetwork");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

