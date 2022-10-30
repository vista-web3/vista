import "@styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@components/Navbar";
import { useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
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

const coinExChain: Chain = {
  id: 53,
  name: "CSC Testnet",
  network: "CSC",
  iconUrl: "/csc.png",
  iconBackground: "#18151E",
  nativeCurrency: {
    decimals: 18,
    name: "CoinEx Token",
    symbol: "CET",
  },
  rpcUrls: {
    default: "https://testnet-rpc.coinex.net/",
  },
  blockExplorers: {
    default: { name: "CoinEx Explorer", url: "https://testnet.coinex.net/" },
  },
  testnet: true,
};

const { chains, provider } = configureChains([coinExChain], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Nexus",
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
