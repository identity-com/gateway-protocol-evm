import axios from "axios";

const validUrl = require('valid-url');

export interface IssuerConfig {
    displayName: string,
    gatewayIssuerEndpoint: string
}

export const ISSUER_CONFIG_PATH = '/issuer-config.json';

export const resolveIssuerConfigFromServiceEndpoint = async (serviceEnpointUrl: string) => {
    // Call endpoint

    const res = await axios.get(`${serviceEnpointUrl}${ISSUER_CONFIG_PATH}`);

    if(res.status !== 200) { 
        throw Error(await res.data); 
    }

    const responseBody = res.data;

    let issuerConfig: IssuerConfig;

    // Verify name exist
    if(!responseBody.displayName) { 
        throw Error("Issuer configuration does not have a displayName"); 
    }

    // Verify url exist
    if(!responseBody.gatewayIssuerEndpoint || validUrl.isWebUri(!responseBody.gatewayIssuerEndpoint)) { 
        throw Error("Issuer configuration does not have a valid gatewayIssuerEndpoint"); 
    }

    issuerConfig =  { displayName: responseBody.displayName, gatewayIssuerEndpoint: responseBody.gatewayIssuerEndpoint };

    return issuerConfig;
}