import { addContractToAdmin, sleep, verify, loadRelayerSigner } from "./defender-utils";
import { Signer } from '@ethersproject/abstract-signer/src.ts'

import hre , { ethers, upgrades } from "hardhat";

async function main() {
    const shouldUseDefender = process.env.SHOULD_USE_DEFENDER!.toLowerCase() == "true";
    let signer: Signer;

    if(shouldUseDefender) {
        signer = await loadRelayerSigner();
    } else {
    }

    const ChargeHandler = await ethers.getContractFactory("ChargeHandler", signer!);

    const chargeHandler = await upgrades.deployProxy(ChargeHandler, [process.env.BSC_TESTNET_RELAYER!],
        {
            kind: "uups",
            redeployImplementation: "always"
        });

    const deployedAddress = chargeHandler.address;


    await sleep(6000);

    await hre.run("verify:verify", {
        address: deployedAddress,
    });

    // Need to wait to avoid rate limit
    await sleep(2000);
    await addContractToAdmin(deployedAddress, "Charge Handler");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

