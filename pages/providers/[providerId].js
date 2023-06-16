// the Utility Provider detail page
import Head from 'next/head'
import { Fragment } from 'react'

import Provider from '@/modules/provider'
import NftList from 'components/nft-list'


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
  const providerId = context.params.providerId

  const provider = await fetch(`${process.env.NEXTAUTH_URL}/api/queries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({func:"getProviderById", id:providerId}),
  })
  const providerNfts = await fetch(`${process.env.NEXTAUTH_URL}/api/queries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({func:"getProviderNfts", id:context.params.name}),
  })

  return {
    props: {
      provider,
      providerNfts: providerNfts,
    },
    revalidate: 1800,
  }
}

// gets a provider id by the path queried
export async function getStaticPaths() {

  const providers = await Promise.all([
    (async () => {
      const providersResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/queries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ func: 'getAllProviders' }),
      });

      return allProvidersResponse.json();
    })()
  ]);


  const paths = providers.map((provider) => ({
    params: { providerId: provider.id, name:provider.name },
  }))

  return {
    paths: paths,
    // let getstatic know if there are more paths
    fallback: 'blocking',
  }
}

export default ProviderDetailPage
