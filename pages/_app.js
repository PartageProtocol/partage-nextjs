import Head from "next/head";

import Layout from "../components/layout/layout";
import { NotificationContextProvider } from "../store/notification-context";
import { SessionProvider } from 'next-auth/react';

import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  return (
    <NotificationContextProvider>
      <SessionProvider session = {session}>
      <Layout>
        <Head>
          <title>Partage NFTs</title>
          <meta
            name="description"
            content="Shared NFT Utilities built on the Bitcoin blockchain"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
    </NotificationContextProvider>
  );
}

export default MyApp;
