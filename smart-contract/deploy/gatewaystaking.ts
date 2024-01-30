import { addContractToAdmin, loadRelayerSigner, sleep, verify } from "./defender-utils";
import { ethers } from 'hardhat';
import { Signer } from '@ethersproject/abstract-signer/src.ts'

async function main() {
    const shouldUseDefender = process.env.SHOULD_USE_DEFENDER!.toLowerCase() == "true";

    const testnetTokenContractAddress = "0xf380c37eFf6c5ab0593927dFf4Bc7AF6428D541F";

    const args = [testnetTokenContractAddress , 'Identity Test Staking Vault', "ID_TEST_STAKE"];
    
    let signer: Signer;

    if(shouldUseDefender) {
        signer = await loadRelayerSigner();
    } else {
    }

    const GatewayStakingContractFactory = await ethers.getContractFactory("GatewayStaking", signer!);
    const gatewayStakingContract = await GatewayStakingContractFactory.deploy(args);

    await gatewayStakingContract.deployed();
    const deployedAddress = gatewayStakingContract.address;

    console.log(`GatewayStaking deployed at ${deployedAddress}`);

    await sleep(6000);

    await verify(deployedAddress,[]);

    // Need to wait to avoid rate limit
    await sleep(2000);
    await addContractToAdmin(deployedAddress, "GatewayStaking");
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

