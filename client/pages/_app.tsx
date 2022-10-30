import "@styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@components/Navbar";
import { useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { chain } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  Theme,
  darkTheme,
  Chain,
} from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import merge from "lodash.merge";
import Head from "next/head";

const cronosTestnet: Chain = {
  id: 338,
  name: "Cronos Testnet",
  network: "Cronos",
  iconUrl: "/cronos.png",
  iconBackground: "#18151E",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos Token",
    symbol: "tCRO",
  },
  rpcUrls: {
    default: "https://cronos-testnet-3.crypto.org:8545/",
  },
  blockExplorers: {
    default: {
      name: "Cronos Explorer",
      url: "https://cronos.crypto.org/explorer/testnet3/",
    },
  },
  testnet: true,
};

const cronosMainnet: Chain = {
  id: 25,
  name: "Cronos Mainnet",
  network: "Cronos",
  iconUrl: "/cronos.png",
  iconBackground: "#18151E",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos Token",
    symbol: "CRO",
  },
  rpcUrls: {
    default: "https://evm-cronos.crypto.org/",
  },
  blockExplorers: {
    default: { name: "Cronos Explorer", url: "https://cronos.org/explorer/" },
  },
  testnet: true,
};

const chiadoChain: Chain = {
  id: 10200,
  name: "Chiado Testnet",
  network: "Gnosis Chiado Testnet",
  iconUrl: "/gnosis.png",
  iconBackground: "#18151E",
  nativeCurrency: {
    decimals: 18,
    name: "xDai Token",
    symbol: "xDai",
  },
  rpcUrls: {
    default: "https://rpc.eu-central-2.gateway.fm/v3/gnosis/archival/chiado",
  },
  blockExplorers: {
    default: { name: "Gnosis Scan", url: "https://rpc.chiadochain.net" },
  },
  testnet: true,
};

const gnosisChain: Chain = {
  id: 100,
  name: "Gnosis Chain",
  network: "Gnosis Chain",
  iconUrl: "/gnosis.png",
  iconBackground: "#18151E",
  nativeCurrency: {
    decimals: 18,
    name: "xDai Token",
    symbol: "xDai",
  },
  rpcUrls: {
    default: "https://rpc.gnosischain.com",
  },
  blockExplorers: {
    default: { name: "Gnosis Scan", url: "https://gnosisscan.io" },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [
    chain.goerli,
    chain.mainnet,
    cronosTestnet,
    cronosMainnet,
    chiadoChain,
    gnosisChain,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Vista",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

/* Theming */
const theme = extendTheme({
  styles: {
    global: {
      "html,body": {
        backgroundColor: "black",
      },
      div: {
        fontFamily: "DM Sans",
        color: "white",
        backgroundColor: "transparent",
      },
      a: {
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

/* RainbowKit Theming */
const customTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#FA1B91",
  },
} as Theme);

function MyApp({ Component, pageProps, router }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={customTheme}>
        <ChakraProvider theme={theme}>
          <Head>
            <title>Vista: Web3-Native Community Engagement Platform</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
          <Component {...pageProps} key={router.route} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
