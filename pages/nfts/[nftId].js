// the single NFT detail page
import { Fragment } from 'react'
import Head from 'next/head'

import NftLogistics from 'components/nft-detail/nft-logistics'
import Comments from 'components/input/comments'
import NftDetail from '@/modules/nft-detail'

import { getNftById, getHighlightedNfts } from 'helpers/api-util'

const NftDetailPage = ({ nft }) => {
  if (!nft) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>{nft.name}</title>
        <meta name="description" content={nft.description} />
      </Head>

      <NftDetail nft={nft} />
      <Comments nftId={nft.id} />
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const nftId = context.params.nftId

  const nft = await getNftById(nftId)

  return {
    props: {
      nft,
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const nfts = await getHighlightedNfts()

  const paths = nfts.map((nft) => ({ params: { nftId: nft.id } }))

  return {
    paths: paths,
    // let getstatic know if there are more paths
    fallback: 'blocking',
  }
}

export default NftDetailPage
