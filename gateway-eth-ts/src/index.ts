export { GatewayTs } from "./service/GatewayTs";
export { GatewayTsForwarder } from "./service/GatewayTsForwarder";
export { GatewayStaking } from "./service/GatewayStaking";
export { GatewayNetworkClass as GatewayNetwork } from "./service/GatewayNetwork";
export { GatewayGatekeeper } from "./service/GatewayGatekeeper";
export {
  TokenData,
  TokenState,
  DEFAULT_GATEWAY_TOKEN_ADDRESS,
  DEFAULT_FORWARDER_ADDRESS,
  DEFAULT_FLAGS_STORAGE_ADDRESS,
  onGatewayTokenChange,
  removeGatewayTokenChangeListener,
} from "./utils";

import GatewayToken from "./contracts/abi/GatewayToken.sol/GatewayToken.json";
import GatewayNetwork from "./contracts/abi/GatewayNetwork.sol/GatewayNetwork.json";
import Gatekeeper from "./contracts/abi/Gatekeeper.sol/Gatekeeper.json";
import FlexibleNonceForwarder from "./contracts/abi/FlexibleNonceForwarder.sol/FlexibleNonceForwarder.json";
import FlagsStorage from "./contracts/abi/FlagsStorage.sol/FlagsStorage.json";

export const abi = {
  GatewayToken,
  GatewayNetwork,
  FlexibleNonceForwarder,
  FlagsStorage,
  Gatekeeper
};
