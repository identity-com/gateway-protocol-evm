// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import {IGatewayTokenVerifier} from "./interfaces/IGatewayTokenVerifier.sol";
import {MultiERC2771ContextUpgradeable} from "./MultiERC2771ContextUpgradeable.sol";

abstract contract GatedERC2771Upgradeable is MultiERC2771ContextUpgradeable {
    address private _gatewayTokenContract;
    uint256 private _gatekeeperNetwork;

    /// The gateway token is not valid.
    error IsGated__InvalidGatewayToken(address gatewayToken);
    /// The gateway token contract address is zero.
    error IsGated__ZeroContractAddress();

    /**
     * @dev Modifier to make a function callable only when the caller has a valid gateway token.
     *
     * Requirements:
     *
     * - The caller must have a valid, non-expired gateway token on the _gatekeeperNetwork network.
     */
    modifier gated() {
        IGatewayTokenVerifier verifier = IGatewayTokenVerifier(_gatewayTokenContract);
        if (!verifier.verifyToken(_msgSender(), _gatekeeperNetwork)) {
            revert IsGated__InvalidGatewayToken(_gatewayTokenContract);
        }
        _;
    }

    /**
     * @dev Initializes the contract with a gateway token contract address and a gatekeeper network.
     *
     * Contract functions with the `gated` modifier will only be callable when the caller has a valid,
     * non-expired gateway token on the `gatekeeperNetwork` network using this `gatewayTokenContract`.
     *
     * See {ERC2771Context-constructor}.
     */
    // solhint-disable-next-line func-name-mixedcase
    function __GatedERC2771Upgradeable_init(
        address gatewayTokenContract,
        uint256 gatekeeperNetwork,
        address[] calldata trustedForwarders
    ) internal onlyInitializing {
        // check for zero address
        if (gatewayTokenContract == address(0)) {
            revert IsGated__ZeroContractAddress();
        }
        _gatewayTokenContract = gatewayTokenContract;
        _gatekeeperNetwork = gatekeeperNetwork;
        __MultiERC2771ContextUpgradeable_init(trustedForwarders);
    }
}
