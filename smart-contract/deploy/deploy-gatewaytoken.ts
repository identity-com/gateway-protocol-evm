import { sleep, loadRelayerSigner } from "./defender-utils";
import hre , { ethers, upgrades } from "hardhat";
import { Signer } from '@ethersproject/abstract-signer/src.ts'

async function main() {
    const shouldUseDefender = process.env.SHOULD_USE_DEFENDER!.toLowerCase() == "true";
    
    let signer: Signer;

    if(shouldUseDefender) {
        signer = await loadRelayerSigner();
    } else {
    }

    const gatewayNetworkContractAddress = "0xAccdD5e32245b090e102E94E9a78A8996F834333";
    const gatekeeperContractAddress = "0x8eB5f23002aA571B9c49b6b4c820c88c08e9ff9b";
    const gatewayStakingContractAddress = "0xe647c80DD554e89b70629E5f3751101A1a7F3cCE";
    const chargeHandlerContractAddress = "0xDc3f03B401826FEAA80bdCA3c3CB2d5816a5Bc77";
    const flagsStorageContractAddress = "0x06c9d91b3Acc1D2434342242C987064E555FFe8a";
    const superAdmin = process.env.BSC_TESTNET_RELAYER!;
    const name = "Gateway Token";
    const symbol = "GWTK";

    const args = [name, symbol, superAdmin, flagsStorageContractAddress, chargeHandlerContractAddress,[],gatewayNetworkContractAddress,gatekeeperContractAddress,gatewayStakingContractAddress];

    const GatewayToken = await ethers.getContractFactory("GatewayToken", signer!);

    const gatewayToken = await upgrades.deployProxy(GatewayToken, args,
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

