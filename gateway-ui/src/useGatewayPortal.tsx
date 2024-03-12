import React, { useState, useEffect } from 'react';
import { GatewayGatekeeper, GatewayNetwork, GatewayTs } from "@identity.com/gateway-eth-ts";
import { Wallet, utils } from 'ethers';
import { BNB_TESTNET_CONTRACT_ADDRESSES } from './utils';

export interface GatewayPortalProps {
    userWallet: Wallet,
    networkName: string
}

interface Network {
    name: string // may need to be bytes,
    feeToken: string,
    description: string
}

interface ValidPassData {
    issuerAddress: string,
    linkToGatekeeper: string,
    passExpiration: string
}

interface InvalidPassData {
    potentialIssuers: PassIssuer[];
}

interface PassIssuer {
    issuerAddress: string,
    issuanceFee: string,
    passRequestLink: string
}

export interface GatewayPortalData {
    hasValidPass: boolean,
    networkInfo: Network
    validPassData?: ValidPassData
    invalidPassData?: InvalidPassData
}

const getTokenContractAddresses = async (userWallet: Wallet) => {
    const chainId = await userWallet.getChainId();

    // BNB testnet
    if(chainId == 97) {
        return { 
            network: BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork,
            token: BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken,
            gatekeeper: BNB_TESTNET_CONTRACT_ADDRESSES.gatekeeper
        } ;
    } else {
        throw Error("Unsupported chain detected");
    }
}


/**
 * Hook used to interact with gatway protocol typescript client
 */

export const useGatewayPortal = (props: GatewayPortalProps) => {
    const { networkName, userWallet } = props;

    const [portalData, setPortalData] = useState<GatewayPortalData>();

    //ts-client interaction
    useEffect(() => {

        const load = async () => {
            const userAddress = userWallet.address;
            const { network, token, gatekeeper} = await getTokenContractAddresses(userWallet);
            const networkNameInBytes = utils.formatBytes32String(networkName);

            // Call network contract to fetch network data
            const tokenClient = new GatewayTs(userWallet, token);
            const networkClient = new GatewayNetwork(userWallet, network);
            const gatekeeperClient = new GatewayGatekeeper(userWallet,gatekeeper);

            const networkId = await networkClient.getNetworkId(networkNameInBytes);
            const networkResponse = await networkClient.getNetwork(networkId.toString());

            // Verify if userAddress has a valid pass
            const hasValidToken = await tokenClient.verify(userAddress, networkId.valueOf() as bigint);

            // set state

            if(hasValidToken) {
                const tokenData = await tokenClient.getFirstTokenOnNetwork(userAddress, networkId.valueOf() as bigint);
                const tokenGatekeeper = await tokenClient.getTokenGatekeeper(tokenData.tokenId.toString());
                setPortalData({
                    hasValidPass: hasValidToken,
                    networkInfo: {
                        name: networkNameInBytes,
                        description: "This network can meet your KYC needs by ID verification and verifying liveliness",
                        feeToken: await networkResponse.supportedToken
                    },
                    validPassData: {
                        issuerAddress: tokenGatekeeper,
                        passExpiration: formatTimestampToDateTime(tokenData.expiration.toString()),
                        linkToGatekeeper: ""
                    }
                });
            } else {
                const gatekeeperAddressesInNetwork = await networkClient.getGatekeepersOnNetwork(networkNameInBytes);

                const gatekeepers = await Promise.all( gatekeeperAddressesInNetwork.map(async gatekeeperAddress => {
                    const fees = await gatekeeperClient.getGatekeeperNetworkData(networkNameInBytes,gatekeeper);
                    return { issuanceFee: fees.fees.issueFee, issuerAddress: gatekeeperAddress, passRequestLink: "" } as PassIssuer
                }));

                setPortalData({
                    hasValidPass: hasValidToken,
                    networkInfo: {
                        name: networkNameInBytes,
                        description: "This network can meet your KYC needs by ID verification and verifying liveliness",
                        feeToken: await networkResponse.supportedToken
                    },
                    invalidPassData: {
                        potentialIssuers: gatekeepers
                    }
                });
            }

        }
        load();
    }, [networkName, userWallet]);
    return portalData;
}

export const formatTimestampToDateTime = (unixTimeString: string) => {return (new Date(Number(unixTimeString)  * 1000)).toLocaleDateString()}