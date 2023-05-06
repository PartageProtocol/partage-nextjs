// marketplace page with all NFTs rendered from NftList
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { getAllNfts } from 'helpers/api-util'
import NftList from 'components/nfts/nft-list'
import NftsSearch from 'components/nfts/nfts-search'

function AllNftsPage(props) {
  const router = useRouter()
  // call all nfts with properties into function
  const { nfts } = props

  // find the nft queried in browser
  function findNftsHandler(category, provider) {
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
      <NftsSearch onSearch={findNftsHandler} />
      <NftList nfts={nfts} />
    </Fragment>
  )
}

// get all nfts from database
export async function getStaticProps() {
  const nfts = await getAllNfts()

  return {
    props: {
      nfts: nfts,
    },
    revalidate: 60,
  }
}

export default AllNftsPage
