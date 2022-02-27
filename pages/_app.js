import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { WalletProvider } from "../context/wallet";

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <ChakraProvider>
        <Head>
          <title>Maroko Design NFT</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </WalletProvider>
  );
}

export default MyApp;
