import { addContractToAdmin, sleep, verify, getDeploymentSigner } from "./defender-utils";
import { ethers } from 'hardhat';
import { Signer } from '@ethersproject/abstract-signer/src.ts'

async function main() {
    const signer: Signer = await getDeploymentSigner();

    const GatekeeperContractFactory = await ethers.getContractFactory("Gatekeeper", signer!);
    const gatekeeperContract = await GatekeeperContractFactory.deploy();

    await gatekeeperContract.deployed();
    const deployedAddress = gatekeeperContract.address;

    console.log(`Gatekeeper deployed at ${deployedAddress}`);

    await sleep(6000);

    await verify(deployedAddress,[]);

    // Need to wait to avoid rate limit
    await sleep(2000);
    await addContractToAdmin(deployedAddress, "Gatekeeper");
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

