import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { 
    GatewayNetwork, 
    GatewayNetwork__factory, 
    IGatewayNetwork, 
    Gatekeeper, 
    Gatekeeper__factory, 
    IGatewayGatekeeper,
    GatewayStaking,
    GatewayStaking__factory,
    DummyERC20,
    DummyERC20__factory, 
} from '../typechain-types' ;
import { utils } from 'ethers';

describe('Gatekeeper', () => {
    let primaryAuthority: SignerWithAddress;
    let gatekeeper: SignerWithAddress;
    let bob: SignerWithAddress;
    let deployer: SignerWithAddress;
    let stableCoin: SignerWithAddress;

    let gatekeeperNetworkContract: GatewayNetwork;
    let gatekeeperContract: Gatekeeper;
    let gatewayStakingContract: GatewayStaking;
    let dummyErc20Contract: DummyERC20;

    let  defaultNetwork: IGatewayNetwork.GatekeeperNetworkDataStruct;

    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    const DEFAULT_PASS_EXPIRE_TIME_IN_SECONDS = Date.now() + 100000000;

    const getDefaultNetwork = (primaryAuthority: string, gatekeepers?: string[], passExpireDurationInSeconds?: number): IGatewayNetwork.GatekeeperNetworkDataStruct => {
        return {
            primaryAuthority,
            name: utils.formatBytes32String('default'),
            passExpireDurationInSeconds: passExpireDurationInSeconds ? passExpireDurationInSeconds : DEFAULT_PASS_EXPIRE_TIME_IN_SECONDS,
            networkFeatureMask: 0,
            networkFee: {issueFee: 0, refreshFee: 0, expireFee: 0, freezeFee: 0},
            supportedToken: ZERO_ADDRESS,
            gatekeepers: gatekeepers ? gatekeepers : [],
            lastFeeUpdateTimestamp: 0
        }
    }

    beforeEach('setup', async () => {
        [deployer, primaryAuthority, gatekeeper, bob, stableCoin] = await ethers.getSigners();

        // Silence warnings from upgradable contracts with immutable variables
        await upgrades.silenceWarnings();

        const gatewayNetworkFactory = await new GatewayNetwork__factory(deployer);
        const gatekeeperContractFactory = await new Gatekeeper__factory(deployer);
        const gatewayStakingFactory = await new GatewayStaking__factory(deployer);
        const erc20Factory = await new DummyERC20__factory(deployer);

        gatekeeperContract = await upgrades.deployProxy(gatekeeperContractFactory, [deployer.address], { kind: 'uups', unsafeAllow: ['state-variable-immutable']}) as Gatekeeper;

        dummyErc20Contract = await erc20Factory.deploy('DummyToken', 'DT', 10000000000, deployer.address);
        await dummyErc20Contract.deployed();

        gatewayStakingContract = await upgrades.deployProxy(gatewayStakingFactory, [deployer.address], 
            { 
                kind: 'uups', 
                constructorArgs: [dummyErc20Contract.address, 'GatewayProtocolShares', 'GPS'] ,
                unsafeAllow: ['state-variable-immutable', 'constructor']
            }) as GatewayStaking;

        await gatewayStakingContract.deployed();

        gatekeeperNetworkContract = await upgrades.deployProxy(gatewayNetworkFactory, [deployer.address, gatekeeperContract.address, gatewayStakingContract.address], {kind: 'uups', unsafeAllow: ['state-variable-immutable']}) as GatewayNetwork;
        await gatekeeperNetworkContract.deployed();

        defaultNetwork = getDefaultNetwork(primaryAuthority.address, []);
        await gatekeeperNetworkContract.connect(deployer).createNetwork(defaultNetwork, {gasLimit: 300000});

        await gatekeeperContract.setNetworkContractAddress(gatekeeperNetworkContract.address);

        await gatekeeperNetworkContract.connect(primaryAuthority).addGatekeeper(gatekeeper.address, defaultNetwork.name, {gasLimit: 300000});
    })

    describe('Contract initialization', async () => {
        it('resolves the correct network contract', async () => {
            expect(await gatekeeperContract._gatewayNetworkContract()).to.be.eq(gatekeeperNetworkContract.address);
        });
        
        it('only the superAdmin can set the network contract address', async () => {
            await expect(gatekeeperContract.connect(bob).setNetworkContractAddress(gatekeeperNetworkContract.address , {gasLimit: 300000})).to.be.revertedWithCustomError(gatekeeperContract, 'Common__NotSuperAdmin');
        })
    })

    describe('Gatekeeper Creation', async () => {
        it('Correctly configures a new gatekeeper when a gatekeeper is joining a network', async () => {
            const gatekeeperNetworkData = await gatekeeperContract.getGatekeeperNetworkData(defaultNetwork.name, gatekeeper.address);

            expect(gatekeeperNetworkData.status).to.be.eq(1);
            expect(gatekeeperNetworkData.initialized).to.be.true;
            expect(gatekeeperNetworkData.lastFeeUpdateTimestamp).to.eq(0);
        });

        it('gatekeeper can only be added by the network contract', async () => {
            await expect(gatekeeperContract.connect(primaryAuthority).initializeGatekeeperNetworkData(defaultNetwork.name, gatekeeper.address, 1, {gasLimit: 300000})).to.be.rejectedWith("Only the gateway network contract can interact with this function");
        })
    })


    describe('Gatekeeper Updates', async () => {
        it('gatekeepers can update fees on the networks they are in', async () => {
            /// given 
            const defaultFees = (await gatekeeperContract.getGatekeeperNetworkData(defaultNetwork.name, gatekeeper.address)).fees;
            expect(defaultFees.issueFee).to.be.eq(0);
            expect(defaultFees.refreshFee).to.be.eq(0);
            expect(defaultFees.expireFee).to.be.eq(0);

            // when
            const newFees: IGatewayGatekeeper.GatekeeperFeesStruct =  {
                issueFee: 100,
                refreshFee: 200,
                expireFee: 300,
                freezeFee: 50
            }

            await gatekeeperContract.connect(gatekeeper).updateFees(newFees, defaultNetwork.name, {gasLimit: 300000});
            const gatekeeperNetworkData = await gatekeeperContract.getGatekeeperNetworkData(defaultNetwork.name, gatekeeper.address);
            const updatedFees = gatekeeperNetworkData.fees

            expect(gatekeeperNetworkData.lastFeeUpdateTimestamp).to.be.eq(await time.latest());
            expect(updatedFees.issueFee).to.be.eq(newFees.issueFee);
            expect(updatedFees.refreshFee).to.be.eq(newFees.refreshFee);
            expect(updatedFees.expireFee).to.be.eq(newFees.expireFee);
        });

        it('gatekeepers cannot update fees on a network that recently updated fees', async () => {
            /// given 
            const defaultFees = (await gatekeeperContract.getGatekeeperNetworkData(defaultNetwork.name, gatekeeper.address)).fees;
            expect(defaultFees.issueFee).to.be.eq(0);
            expect(defaultFees.refreshFee).to.be.eq(0);
            expect(defaultFees.expireFee).to.be.eq(0);

            // when
            const newFees: IGatewayGatekeeper.GatekeeperFeesStruct =  {
                issueFee: 100,
                refreshFee: 200,
                expireFee: 300,
                freezeFee: 500
            }

            await gatekeeperContract.connect(gatekeeper).updateFees(newFees, defaultNetwork.name, {gasLimit: 300000});
            const gatekeeperNetworkData = await gatekeeperContract.getGatekeeperNetworkData(defaultNetwork.name, gatekeeper.address);

            expect(gatekeeperNetworkData.lastFeeUpdateTimestamp).to.be.eq(await time.latest());

            const gatekeeperFeeConfigDelay = await gatekeeperContract.FEE_CONFIG_DELAY_TIME();

            // fast forward to the future where fees still can't be updated
            await time.increaseTo(gatekeeperNetworkData.lastFeeUpdateTimestamp.add(gatekeeperFeeConfigDelay.sub(100)));

            await expect(gatekeeperContract.connect(gatekeeper).updateFees(newFees, defaultNetwork.name, {gasLimit: 300000})).to.be.revertedWithCustomError(gatekeeperContract, 'GatekeeperFeeCannotBeUpdatedYet');
        });

        it('gatekeepers cannot update fees on the networks they are not a part of', async () => {
            // when
            const newFees: IGatewayGatekeeper.GatekeeperFeesStruct =  {
                issueFee: 100,
                refreshFee: 200,
                expireFee: 300,
                freezeFee: 50
            }
            await expect(gatekeeperContract.connect(bob).updateFees(newFees, defaultNetwork.name, {gasLimit: 300000})).to.be.revertedWithCustomError(gatekeeperContract, 'GatekeeperNotInNetwork');
        });

        it('gatekeeper status can only be updated through the network contract', async () => {
            await expect(gatekeeperContract.connect(primaryAuthority).updateGatekeeperStatus(defaultNetwork.name, gatekeeper.address, 0, {gasLimit: 300000})).to.be.rejectedWith("Only the gateway network contract can interact with this function");
        });
    })

    describe('Gatekeeper Removal', async () => {
        it('gatekeeper can only be removed through the network contract', async () => {
            await expect(gatekeeperContract.connect(primaryAuthority).removeGatekeeper(defaultNetwork.name, gatekeeper.address, {gasLimit: 300000})).to.be.rejectedWith("Only the gateway network contract can interact with this function");
        });
    })
})