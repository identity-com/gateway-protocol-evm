// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import {IGatewayToken} from "../../contracts/interfaces/IGatewayToken.sol";

/**
 * @dev A stub multisig contract, used to test the DAO Management functionality
 * NOTE: DO NOT DEPLOY THIS CONTRACT. It should be deployed locally by the test suite only.
 */
contract StubMultisig {
    address private _gatewayTokenContract;
    uint256 private _gatekeeperNetwork;

    constructor(address gatewayTokenContract, uint256 gatekeeperNetwork) {
        _gatewayTokenContract = gatewayTokenContract;
        _gatekeeperNetwork = gatekeeperNetwork;
    }
}
