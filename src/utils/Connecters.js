import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

const walletconnect = new WalletConnectConnector({
  rpcUrl: `https://zksync2-testnet.zksync.dev`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
};
