// the single NFT detail page
import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'

import Button from '../../components/ui/button'
import Comments from 'components/input/comments'
import NftDetail from '@/modules/nft-detail'
import { getAllNfts } from 'helpers/frontend-db-util'
import { contractEvents } from '../../helpers/contract-events'

import { paths } from 'store/dbSnapshot'

const NftDetailPage = ({ nft }) => {
  const [owner, setOwner] = useState('')
  const [uri, setUri] = useState('')
  const [provider, setProvider] = useState('')
  const [supply, setSupply] = useState('')
  const {
    getOwner,
    getUri,
    getTotalSupply,
    buyFractions,
    buyNft,
    getUtilityProvider,
  } = contractEvents()
  
  //??? "u12" type
  const nftid = nft.id
  if (!nft) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  useEffect(() => {
    getOwner(nftid).then((data) => setOwner(data))
    getUri(nftid).then((data) => setUri(data))
    getUtilityProvider(nftid).then((data) => setProvider(data))
    getTotalSupply(nftid).then((data) => setSupply(data))
  }, [])

  return (
    <Fragment>
      <Head>
        <title>{nft.name}</title>
        <meta name="description" content={nft.description} />
      </Head>
      <NftDetail nft={nft} />
      <div className="center">
        <Button onClick={() => buyNft()}>Buy NFT</Button>
        <Button onClick={() => buyFractions()}>Buy Fractions</Button>
      </div>
      <div>
        <p>{'The owner is: ' + owner}</p>
        <p>{'The uri is: ' + uri}</p>
        <p>{'The provider is: ' + provider}</p>
        <p>{'The supply is: ' + supply}</p>
        {/* <Button onClick={() => getOwner(nftid)}>Owner?</Button> */}
        {/* <Button onClick={() => getUri(nftid)}>Token uri?</Button> */}
        {/* <Button onClick={() => getUtilityProvider()}>Utility provider?</Button> */}
        {/* <Button onClick={() => getTotalSupply(nftid)}>Total supply?</Button> */}
      </div>
      <Comments nftId={nft.id} />
    </Fragment>
  )
}

export async function getStaticProps(context) {
  // const nftId = context.params.nftId

  // const nftArray = await Promise.all([
  //   (async () => {
  //     const nftResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/queries`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ func: 'getNftById', id:nftId }),
  //     });

  //     return nftResponse.json();
  //   })()
  // ]);
  // const nft = nftArray[0][0]
  return {
    props: {
      nft: {}, // remove this empty object!!!!
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {

  // const nfts = await Promise.all([
  //   (async () => {
  //     const highlightedNftsResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/queries`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ func: 'getHighlightedNfts' }),
  //     });

  //     return highlightedNftsResponse.json();
  //   })()
  // ]);

  // const paths = nfts[0].map((nft) => ({ params: { nftId: (nft.id).toString() } }))
  // console.log('paths: ', paths)
  return {
    paths: paths,
    // let getstatic know if there are more paths
    fallback: 'blocking',
  }
}

export default NftDetailPage
