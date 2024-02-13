import * as dotenv from "dotenv";


dotenv.config();

describe("Gateway Gatekeeper TS class", function () {

    before("Initialize gateway gatekeeper ts class", async function () {
    
    });

    it("should return the state of a valid gatekeeper", async function () {
        // 1) Config
        /**
         * - Create a network
         * - Add a gatekeeper
         * - Read the gatekeepers data and verify
         */
    });

    it("should fail to return the state of a gatekeeper that doesnt exist", async function () {
        // 1) Config
        /**
         * - Try to read a gatekeeper that doesn't exist
         */
    });

    it("should allow a gatekeeper to update their fee configuration", async function () {
    
    });

    it("should not allow a address that is not a gatekeeper to update their fee configuration", async function () {
    
    });
})