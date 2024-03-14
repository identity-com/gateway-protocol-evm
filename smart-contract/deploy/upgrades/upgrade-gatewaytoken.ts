import { sleep, getDeploymentSigner } from ".././defender-utils";
import hre , { ethers, upgrades } from "hardhat";
import { Signer } from '@ethersproject/abstract-signer/src.ts'
import { BNB_TESTNET_CONTRACT_ADDRESSES } from "../utils";

async function main() {    
    const signer: Signer = await getDeploymentSigner();

    const GatewayToken = await ethers.getContractFactory("GatewayToken", signer!);

    const gatewayToken = await upgrades.upgradeProxy(
        BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken,
        GatewayToken,
        {
            kind: "uups",
            redeployImplementation: "always"
        });

    const deployedAddress = gatewayToken.address;


    await sleep(6000);

    await hre.run("verify:verify", {
        address: deployedAddress,
    });

    // Need to wait to avoid rate limit
    await sleep(2000);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

