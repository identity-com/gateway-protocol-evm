import { IssuerConfig, ISSUER_CONFIG_PATH, resolveIssuerConfigFromServiceEndpoint } from "../../src/utils/issuer";
import * as assert from "assert";
import nock from "nock";

const TEST_ISSUER_CONFIG: IssuerConfig = {
    displayName: "Test Gatekeeper",
    gatewayIssuerEndpoint: "https://testurl.com"
}

const TEST_VALID_SERVICE_ENDPOINT = "https://service-endpoint.com";
const TEST_INVALID_NAME_SERVICE_ENDPOINT = "https://service-endpoint-invalid-name.com";
const TEST_INVALID_URL_SERVICE_ENDPOINT = "https://service-endpoint-invalid-url.com";

nock(TEST_VALID_SERVICE_ENDPOINT)
  .get(ISSUER_CONFIG_PATH)
  .reply(200, TEST_ISSUER_CONFIG);

nock(TEST_INVALID_NAME_SERVICE_ENDPOINT)
.get(ISSUER_CONFIG_PATH)
.reply(200, {...TEST_ISSUER_CONFIG, displayName: ""});

nock(TEST_INVALID_URL_SERVICE_ENDPOINT)
.get(ISSUER_CONFIG_PATH)
.reply(200, {...TEST_ISSUER_CONFIG, gatewayIssuerEndpoint: ""});

describe.only("Issuer Config Utility", () => {

    it('should correctly resolve test issuer config', async () => {
        const issuerConfig = await resolveIssuerConfigFromServiceEndpoint(TEST_VALID_SERVICE_ENDPOINT);

        assert.equal(issuerConfig.displayName, TEST_ISSUER_CONFIG.displayName);
        assert.equal(issuerConfig.gatewayIssuerEndpoint, TEST_ISSUER_CONFIG.gatewayIssuerEndpoint);
    });

    it('should fail to resolve test issuer config due to missing display name', () => {
        assert.rejects(() => resolveIssuerConfigFromServiceEndpoint(TEST_INVALID_NAME_SERVICE_ENDPOINT), "Issuer configuration does not have a displayName");
    });

    it('should fail to resolve test issuer config due to malformed issuer endpoint', () => {
        assert.rejects(() => resolveIssuerConfigFromServiceEndpoint(TEST_INVALID_URL_SERVICE_ENDPOINT), "Issuer configuration does not have a valid gatewayIssuerEndpoint");
    });
})