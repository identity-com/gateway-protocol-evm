import React, { useState, useEffect, useMemo } from 'react';
import { GatewayGatekeeper, GatewayNetwork, GatewayTs, TokenState } from "@identity.com/gateway-eth-ts";
import { DidRegistry } from "@identity.com/did-bnb-client";
import { Wallet, utils } from 'ethers';
import { BNB_TESTNET_CONTRACT_ADDRESSES, ZERO_ADDRESS } from './utils';
import { resolveIssuerConfigFromServiceEndpoint } from '@identity.com/gateway-eth-ts/dist/utils/issuer';

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
    issuerAlias: string,
    issuanceFee: string,
    passRequestLink?: string
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

    const [portalData, setPortalData] = useState<GatewayPortalData>(undefined);
    const [isNetworkLoaded, setIsNetworkLoaded] = useState<boolean>(false);

    // load gateway protocol data ts-client interaction
    useMemo(() => {

        const load = async () => {
            const userAddress = userWallet.address;
            const { network, token, gatekeeper} = await getTokenContractAddresses(userWallet);

            const tokenClient = new GatewayTs(userWallet, token);
            const networkClient = new GatewayNetwork(userWallet, network);
            const gatekeeperClient = new GatewayGatekeeper(userWallet,gatekeeper);
            
            const networkNameInBytes = utils.formatBytes32String(networkName);

            // Call network contract to fetch network data

            const networkId = await networkClient.getNetworkId(networkNameInBytes);
            const networkResponse = await networkClient.getNetwork(networkId.toString());

            // Verify if userAddress has a valid pass
            const tokenData = await tokenClient.getFirstTokenOnNetwork(userAddress, networkId.valueOf() as bigint);
            const hasValidToken = tokenData && tokenData.state == TokenState.ACTIVE;

            // set state

            if(hasValidToken) {
                const tokenData = await tokenClient.getFirstTokenOnNetwork(userAddress, networkId.valueOf() as bigint);
                const tokenGatekeeper = await tokenClient.getTokenGatekeeper(tokenData.tokenId.toString());

                const feeTokenAddress = await networkResponse.supportedToken;
                setPortalData({
                    hasValidPass: hasValidToken,
                    networkInfo: {
                        name: networkNameInBytes,
                        description: "This network can meet your KYC needs by ID verification and verifying liveliness",
                        feeToken: feeTokenAddress == ZERO_ADDRESS ? "BNB" : feeTokenAddress
                    },
                    validPassData: {
                        issuerAddress: tokenGatekeeper,
                        passExpiration: formatTimestampToDateTime(tokenData.expiration.toString()),
                        linkToGatekeeper: ""
                    }
                });
            } else {
                const gatekeeperAddressesInNetwork = await networkClient.getGatekeepersOnNetwork(networkNameInBytes);
                const feeTokenAddress = await networkResponse.supportedToken;

                const gatekeepers = await Promise.all( gatekeeperAddressesInNetwork.map(async gatekeeperAddress => {
                    const fees = await gatekeeperClient.getGatekeeperNetworkData(networkNameInBytes,gatekeeperAddress);
                    return { issuanceFee: fees.fees.issueFee, issuerAlias: gatekeeperAddress, passRequestLink: "" } as PassIssuer
                }));

                setPortalData({
                    hasValidPass: hasValidToken,
                    networkInfo: {
                        name: networkNameInBytes,
                        description: "This network can meet your KYC needs by ID verification and verifying liveliness",
                        feeToken: feeTokenAddress == ZERO_ADDRESS ? "BNB" : feeTokenAddress
                    },
                    invalidPassData: {
                        potentialIssuers: gatekeepers
                    }
                });
            }
            setIsNetworkLoaded(true);
        }

        load();
    }, [networkName, userWallet]);

    // Load issuer service for each gatekeeper
    useEffect(() => {

        const loadGatekeeperIssuerData = async () => {
            // If we need to look up the service endpoint of each gatekeeper
            if(portalData && portalData.invalidPassData) {
                const didResitry = new DidRegistry(userWallet, BNB_TESTNET_CONTRACT_ADDRESSES.didRegistry, {chainEnvironment: 'testnet'});
                const issuers = await Promise.all(portalData.invalidPassData.potentialIssuers.map(async (issuer) => {
                    didResitry.setDidIdentifier(issuer.issuerAlias)
                    // Resolve DID
                    const issuerDid = await didResitry.resolve();

                    // if DID has services
                    if(issuerDid.service) {
                        const issuerService = issuerDid.service.find(service => service.type === 'gateway-issuer');

                        if(issuerService) {
                            let issuerServiceEndpoint = issuerService.serviceEndpoint;

                            if(Array.isArray(issuerServiceEndpoint)) {
                                issuerServiceEndpoint = issuerService.serviceEndpoint[0];
                            }
                            const resolvedConfig = await resolveIssuerConfigFromServiceEndpoint(issuerServiceEndpoint.valueOf() as string);
                            return {
                                issuerAlias: resolvedConfig.displayName,
                                issuanceFee: issuer.issuanceFee,
                                passRequestLink: resolvedConfig.gatewayIssuerEndpoint
                            }
                        }
                    }

                    return issuer;
                }));

                setPortalData({
                    ...portalData,
                    invalidPassData: {
                        potentialIssuers: issuers
                    }
                });
            }
        }
        loadGatekeeperIssuerData();
    }, [isNetworkLoaded]);
    
    return portalData;
}

export const formatTimestampToDateTime = (unixTimeString: string) => {
    const date = new Date(Number(unixTimeString)  * 1000)
    return  date.toLocaleDateString() + " at " + date.toLocaleTimeString()
}