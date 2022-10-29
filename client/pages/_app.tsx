import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "@components/Navbar";

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

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Vista: Web3-Native Community Engagement Platform</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} key={router.route} />
    </ChakraProvider>
  );
}
