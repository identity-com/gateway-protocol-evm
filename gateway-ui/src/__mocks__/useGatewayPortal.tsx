import React from 'react';
import { GatewayPortalData, GatewayPortalProps } from '../useGatewayPortal';


export const useGatewayPortal = (props: GatewayPortalProps) => {
    const { networkName, userAddress } = props;

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
            passExpiration: "1718150536"
        }
    }

    return portalData;
}