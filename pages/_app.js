import Head from 'next/head'

import Layout from '../components/layout/layout'
import { NotificationContextProvider } from '../store/notification-context'
import { SessionProvider } from 'next-auth/react'
import { Space_Mono, Work_Sans } from 'next/font/google'

import '../styles/globals.css'

const workSans = Work_Sans({ subsets: ['latin'], variable: '--workSans-font' })
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--spaceMono-font',
})

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <NotificationContextProvider>
      <SessionProvider session={session}>
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
        <main className={`${workSans.variable} ${spaceMono.variable}`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </SessionProvider>
    </NotificationContextProvider>
  )
}

export default MyApp
