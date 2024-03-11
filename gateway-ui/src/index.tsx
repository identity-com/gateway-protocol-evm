import React, { useState } from 'react';
import { Wallet } from "ethers";
import { Box, Button, Chip, Container, Stack, TextField, Typography } from '@mui/material';
import { GatewayPortalData, formatTimestampToDateTime, useGatewayPortal } from './useGatewayPortal';

interface GatewayProtocolPortalProps {
    networkName: string;
    userWallet: Wallet;
}

export const GatewayProtocolPortal = (props: GatewayProtocolPortalProps) => {
    const { networkName, userWallet } = props;

    const gatewayPortalData = useGatewayPortal({networkName, userAddress: userWallet.address});

    const { networkInfo, hasValidPass } = gatewayPortalData;
    return(
        <Box borderColor={hasValidPass ? "slateblue" : "lightyellow"} sx={{borderRadius: "1px"}} alignItems={"center"}>
            {/* Section for indicating a valid pass being detected or not */}
            <ValidPassIndicator isValid={gatewayPortalData.hasValidPass}/>

            {/* Section for displaying network information */}
            <NetworkInfo name={networkInfo.name} description={networkInfo.description} feeTokenText={networkInfo.feeToken}/>

            {/* Section for displaying pass info */}
            <PassInfo gatewayPortalData={gatewayPortalData}/>
        </Box>
    )
}

interface ValidPassIndicatorProps {
    isValid: boolean
}

export const ValidPassIndicator = (props: ValidPassIndicatorProps) => {
    const isValid = props.isValid;
    return(
        <Container maxWidth='md'>
            <Chip label={isValid ? "Valid Pass Detected" : "No Pass Detected"} color={isValid ? "primary" : "warning"} sx={{fontSize: "1.2rem"}}/>
        </Container>
    )
}

interface NetworkInfoProps {
    name: string,
    description: string,
    feeTokenText: string
}

export const NetworkInfo = (props: NetworkInfoProps) => {
    const { name, description, feeTokenText} = props
    return(
        <Stack spacing={2.5}>
            <Typography variant='h3'>
                {"Network: " + name}
            </Typography>
            <TextField id="filled-basic" variant="outlined" disabled={true} defaultValue={description} multiline/>
            <Typography variant='body1'>
                {"Fee Token Address: " + feeTokenText}
            </Typography>
        </Stack>
    )
}

interface PassInfoProps {
    gatewayPortalData: GatewayPortalData
}

export const PassInfo = (props: PassInfoProps) => {
    const { gatewayPortalData } = props;

    if(gatewayPortalData.hasValidPass) {
        // Show issuer state
        const { validPassData } = gatewayPortalData;
        return(
            <Stack mt={2} spacing={1} alignItems={"center"}>
                <Stack direction="row" spacing={1}>
                    <Typography variant='body1'>
                        Pass Issuer:
                    </Typography>
                    <Typography variant='body1'>
                        {validPassData.issuerAddress}
                    </Typography>
                    <Button variant="contained">
                        Learn More
                    </Button>
                </Stack>
                <Stack direction="row">
                    <Typography variant='body1'>
                        Pass Expiration: 
                    </Typography>
                    <Typography variant='body1'>
                        {" " + formatTimestampToDateTime(validPassData.passExpiration)}
                    </Typography>
                </Stack>
            </Stack>
        )
    } else {
        // Show table of issuers state
        const { invalidPassData } = gatewayPortalData;
        return(
            <Container>
    
            </Container>
        )
    }
}