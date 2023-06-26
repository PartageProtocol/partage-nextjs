// marketplace page with all NFTs rendered from NftList
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import MarketPlace from '@/modules/marketplace'


const NftsPage = ({ nfts }) => {
  const router = useRouter()

  // find the nft queried in browser
  const handleFindNfts = (category, provider) => {
    const fullPath = `/nfts/${category}/${provider}`
    router.push(fullPath)
  }

  return (
    <Fragment>
      <Head>
        <title>Partage's Marketplace</title>
        <meta
          name="description"
          content="Shared NFT Utilities built on the Bitcoin blockchain."
        />
      </Head>

      <MarketPlace nfts={nfts} handleSearch={handleFindNfts} />
    </Fragment>
  )
}

// get all nfts from database
export async function getStaticProps() {

  //All nfts will be big, need to implement a 'lazy load' eventually

  // const nftsArray = await Promise.all([
  //   (async () => {
  //     const allNftsResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/queries`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ func: 'getAllNfts' }),
  //     });

  //     return allNftsResponse.json();
  //   })()
  // ]);
  // const nfts =  nftsArray[0] 
  return {
    props: {
      nfts: [],
    },
    revalidate: 60,
  }
}

export default NftsPage
