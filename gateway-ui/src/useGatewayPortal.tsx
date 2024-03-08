import React, { useState, useEffect } from 'react';

interface GatewayPortalProps {
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

    const [portalData, setPortalData] = useState<GatewayPortalData>();

    //ts-client interaction
    useEffect(() => {
        // Call network contract to fetch network data

        // Verify if userAddress has a valid pass

        // set state
    }, [networkName, userAddress]);

    return portalData;
}

const formatTimestampToDateTime = (unixTimeString: string): string => {return ""}
