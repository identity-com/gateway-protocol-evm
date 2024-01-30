import { addContractToAdmin, sleep, verify, loadRelayerSigner } from "./defender-utils";
import { Signer } from '@ethersproject/abstract-signer/src.ts'
import { ethers } from 'hardhat';


async function main() {
    const shouldUseDefender = process.env.SHOULD_USE_DEFENDER!.toLowerCase() == "true";

    const testnetGatekeeperContractAddress = "0x8eB5f23002aA571B9c49b6b4c820c88c08e9ff9b";
    const testnetStakingContractAddress = "0xe647c80DD554e89b70629E5f3751101A1a7F3cCE";

    const args = [testnetGatekeeperContractAddress, testnetStakingContractAddress];
        
    let signer: Signer;

    if(shouldUseDefender) {
        signer = await loadRelayerSigner(); 
    } else {
    }

    const GatewayNetworkContractFactory = await ethers.getContractFactory("GatewayNetwork", signer!);
    const gatewayNetworkContract = await GatewayNetworkContractFactory.deploy();

    await gatewayNetworkContract.deployed(args);
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

