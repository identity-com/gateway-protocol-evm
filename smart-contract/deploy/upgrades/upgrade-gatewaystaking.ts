import { addContractToAdmin, getDeploymentSigner, sleep, verify } from ".././defender-utils";
import { ethers , upgrades } from 'hardhat';
import { Signer } from '@ethersproject/abstract-signer/src.ts'
import { BNB_TESTNET_CONTRACT_ADDRESSES } from ".././utils";

async function main() {
    const testnetTokenContractAddress = BNB_TESTNET_CONTRACT_ADDRESSES.erc20;

    const args = [testnetTokenContractAddress , 'Identity Test Staking Vault', "ID_TEST_STAKE"];
    
    const signer: Signer = await getDeploymentSigner();

    const GatewayStakingContractFactory = await ethers.getContractFactory("GatewayStaking", signer!);

    const gatewayStakingContract = await upgrades.upgradeProxy(
        BNB_TESTNET_CONTRACT_ADDRESSES.gatewayStaking, 
        GatewayStakingContractFactory, 
        { 
            kind: 'uups', 
            constructorArgs: args,
            unsafeAllow: ['state-variable-immutable', 'constructor']
        });

    await gatewayStakingContract.deployed();
    const deployedAddress = gatewayStakingContract.address;

    console.log(`GatewayStaking upgraded at ${deployedAddress}`);

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

