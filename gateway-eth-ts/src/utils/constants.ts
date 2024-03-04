import { BigNumber } from "ethers";
export const DEFAULT_FLAGS_STORAGE_ADDRESS =
  "0x490D0801844C41E88674F00940590D646E6948b8"; // Proxy address
export const DEFAULT_GATEWAY_TOKEN_ADDRESS =
  "0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E"; // Proxy address
export const DEFAULT_FORWARDER_ADDRESS =
  "0x8419F704CD6520E2C3EF477ef9BFA3159Ea1ACA7"; // Flexible Nonce forwarder

export const DEFAULT_CHARGE_HANDLER_ADDRESS =
  "0x6D5c9629B91D1b3A728D40EFb94d5682454Cae96"; // Proxy address

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

export const ZERO_BN = BigNumber.from("0");
export const ONE_BN = BigNumber.from("1");

// This is the default gas limit used by the GatewayTs forwarder
// if not overridden.
// The Forwarder requires a gas limit to be set, as it is what is passed into the
// inner transaction and signed. Without this, the forwarder would not know
// how much gas to send to the recipient smart contract.
// This gas limit will be ignored if the populatedTransaction includes its own gasLimit,
// so it can be overridden for each transaction if necessary.
export const DEFAULT_GAS_LIMIT = 500_000;
