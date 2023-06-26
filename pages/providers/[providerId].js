// the Utility Provider detail page
import Head from 'next/head'
import { Fragment } from 'react'

import Provider from '@/modules/provider'
import NftList from 'components/nft-list'

import { getAllProviders, getProviderNfts } from 'helpers/frontend-db-util'

import { provider, providerNfts, pathsProvider } from 'store/dbSnapshot'

// builds a provider page from the properties of a selected provider id
function ProviderDetailPage({ provider, providerNfts }) {
  if (!provider) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>Partage's {provider.name} NFTs</title>
        <meta name="description" content={provider.bio} />
      </Head>

      <Provider provider={provider} />

      <h5>NFTs from this provider</h5>
      <NftList nfts={providerNfts} />
    </Fragment>
  )
}

// gets a provider properties by the provider id
export async function getStaticProps(context) {
  // const providerId = context.params.providerId

  // const providerArray = await Promise.all([
  //   getAllProviders()
  // ]);
  // const provider = providerArray[0][0]

  // const providerNftsArray = await Promise.all([
  //   getProviderNfts(provider.name)
  // ]);
  // const providerNfts = providerNftsArray[0]

  return {
    props: {
      provider: provider,
      providerNfts: providerNfts,
    },
    revalidate: 1800,
  }
}

// gets a provider id by the path queried
export async function getStaticPaths() {

  // const providersArray = await Promise.all([
  //   getAllProviders()
  // ]);

  // const providers = providersArray[0]

  // const paths = providers.map((provider) => ({
  //   params: { providerId: (provider.id).toString(), name:provider.name },
  // }))
  // console.log('paths: ', paths)
  return {
    paths: pathsProvider,
    // let getstatic know if there are more paths
    fallback: 'blocking',
  }
}

export default ProviderDetailPage
