import { sleep, getDeploymentSigner } from "./defender-utils";
import hre , { ethers, upgrades } from "hardhat";
import { Signer } from '@ethersproject/abstract-signer/src.ts'

async function main() {     
    const signer: Signer = await getDeploymentSigner();

    const FlagStorage = await ethers.getContractFactory("FlagsStorage", signer!);

    const flagStorage = await upgrades.deployProxy(FlagStorage, [process.env.BSC_TESTNET_RELAYER!],
        {
            kind: "uups",
            redeployImplementation: "always"
        });

    const deployedAddress = flagStorage.address;


    // console.log(`Test gateway erc20 token deployed at ${response.address}`);

    await sleep(6000);

    await hre.run("verify:verify", {
        address: deployedAddress,
    });

    // Need to wait to avoid rate limit
    await sleep(2000);


    return deployedAddress;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

