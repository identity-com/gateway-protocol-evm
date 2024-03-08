import React, { useState } from 'react';
import { Wallet } from "ethers";
import { Chip, Container } from '@mui/material';
import { GatewayPortalData, useGatewayPortal } from './useGatewayPortal';

interface GatewayProtocolPortalProps {
    networkName: string;
    userWallet: Wallet;
}

export const GatewayProtocolPortal = (props: GatewayProtocolPortalProps) => {
    const { networkName, userWallet } = props;

    const gatewayPortalData = useGatewayPortal({networkName, userAddress: userWallet.address});

    return(
        <Container maxWidth='lg' fixed>
            {/* Section for indicating a valid pass being detected or not */}
            <ValidPassIndicator isValid={gatewayPortalData.hasValidPass}/>

            {/* Section for displaying network information */}
            <NetworkInfo name={networkName} description='' feeTokenText=''/>

            {/* Section for displaying pass info */}
            <PassInfo gatewayPortalData={gatewayPortalData}/>
        </Container>
    )
}

interface ValidPassIndicatorProps {
    isValid: boolean
}

export const ValidPassIndicator = (props: ValidPassIndicatorProps) => {
    return(
        <Container>
            <Chip label="Test"/>
        </Container>
    )
}

interface NetworkInfoProps {
    name: string,
    description: string,
    feeTokenText: string
}

export const NetworkInfo = (props: NetworkInfoProps) => {
    return(
        <Container>

        </Container>
    )
}

interface PassInfoProps {
    gatewayPortalData: GatewayPortalData
}

export const PassInfo = (props: PassInfoProps) => {
    const { gatewayPortalData } = props;

    if(gatewayPortalData.hasValidPass) {
        // Show issuer state
        return(
            <Container>
    
            </Container>
        )
    } else {
        // Show table of issuers state
        return(
            <Container>
    
            </Container>
        )
    }
}