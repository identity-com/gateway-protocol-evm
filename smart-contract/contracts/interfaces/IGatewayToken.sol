// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import {ChargeParties} from "../library/Charge.sol";

interface IGatewayToken {
    enum TokenState {
        ACTIVE,
        FROZEN,
        REVOKED
    }

    /**
     * @dev Emitted when GatewayToken contract is initialized.
     */
    event GatewayTokenInitialized(
        string name,
        string symbol,
        address superAdmin,
        address flagsStorage,
        address chargeHandler,
        address[] trustedForwarders
    );

    /**
     * @dev Emitted when a gatekeeper network is created.
     */
    event GatekeeperNetworkCreated(uint256 network, string name, bool daoGoverned, address daoManager);

    /**
     * @dev Emitted when GatewayToken DAO Manager transferred to `newDAOManager` address.
     */
    event DAOManagerTransferred(address previousDAOManager, address newDAOManager, uint256 network);

    /**
     * @dev Emitted when Identity.com Admin updated the ChargeHandler
     * contract address
     */
    event ChargeHandlerUpdated(address indexed chargeHandler);

    /**
     * @dev Emitted when Identity.com Admin added a trusted forwarder
     * contract address
     */
    event ForwarderAdded(address indexed forwarder);

    /**
     * @dev Emitted when Identity.com Admin removed a trusted forwarder
     * contract address
     */
    event ForwarderRemoved(address indexed forwarder);

    /// Insufficient funds for withdrawal. Needed `required` but only
    /// `available` available.
    /// @param available balance available.
    /// @param required requested amount to transfer.
    error GatewayToken__InsufficientFunds(uint256 available, uint256 required);


    /// The gatekeeper network does not exist.
    /// @param network gatekeeper network id.
    error GatewayToken__AddressNotAGatekeeper(uint network, address addr);

    /// The gatekeeper network name is empty.
    error GatewayToken__EmptyNetworkName();

    error GatewayToken__UnsupportedFeeType();

    /// The gatekeeper network is not dao-governed.
    /// @param network gatekeeper network id.
    error GatewayToken__NotDAOGoverned(uint network);

    /// The requested token does not exist.
    /// @param tokenId token id.
    error GatewayToken__TokenDoesNotExist(uint256 tokenId);

    /// The requested token is not active or does not exist
    /// @param tokenId token id.
    /// @param allowExpired whether to allow expired tokens.
    error GatewayToken__TokenDoesNotExistOrIsInactive(uint256 tokenId, bool allowExpired);

    /// The requested token state is invalid for the request
    /// @param tokenId token id.
    /// @param state current token state.
    /// @param expectedState expected token state.
    error GatewayToken__TokenInvalidStateForOperation(uint256 tokenId, TokenState state, TokenState expectedState);

    /// Token transfers are disabled
    error GatewayToken__TransferDisabled();
    /// Token transfers are disabled
    error GatewayToken__GatekeeperDoesNotMeetStakingRequirements();

    function mint(
        address to,
        uint256 network,
        uint expiration,
        uint256 mask,
        ChargeParties calldata partiesInCharge
    ) external payable;

    /**
     * @dev Triggers to get all information relating to gateway `tokenId`
     * @param tokenId Gateway token id
     */
    function getToken(
        uint256 tokenId
    ) external view returns (address owner, uint8 state, string memory identity, uint256 expiration, uint256 bitmask);

}
