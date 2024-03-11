import React, { useState, useEffect } from 'react';

export interface GatewayPortalProps {
    userAddress: string,
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


/**
 * Hook used to interact with gatway protocol typescript client
 */

export const useGatewayPortal = (props: GatewayPortalProps) => {
    const { networkName, userAddress } = props;

    // const [portalData, setPortalData] = useState<GatewayPortalData>();

    //ts-client interaction
    useEffect(() => {
        // Call network contract to fetch network data

        // Verify if userAddress has a valid pass

        // set state
    }, [networkName, userAddress]);

    const portalData: GatewayPortalData = {
        hasValidPass: true,
        networkInfo: {
            name: "Identity.com",
            feeToken: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
            description: "This network can meet your KYC needs by ID verification and verifying liveliness"
        },
        validPassData: {
            issuerAddress: "0x9f16b0Ee033c1170061cD81f8F2DC67265309c0d",
            linkToGatekeeper: "",
            passExpiration: "1720744424"
        }
    }

    return portalData;
}

export const formatTimestampToDateTime = (unixTimeString: string) => {return (new Date(Number(unixTimeString)  * 1000)).toLocaleDateString()}