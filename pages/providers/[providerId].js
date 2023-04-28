// the Utility Provider detail page
import { Fragment } from "react";
import Head from 'next/head';

import { getAllProviders, getProviderById, getProviderNfts } from "../../helpers/api-util";
import ProviderSummary from "../../components/provider-detail/provider-summary";
import ProviderLogistics from "../../components/provider-detail/provider-logistics";
import ProviderContent from "../../components/provider-detail/provider-content";

import NftList from "../../components/nfts/nft-list";

// builds a provider page from the properties of a selected provider id
function ProviderDetailPage(props) {
  const provider = props.selectedProvider;

  if (!provider) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{provider.name}</title>
        <meta
          name="description"
          content={provider.bio}
        />
      </Head>
      <ProviderSummary title={provider.name} />
      <ProviderLogistics
        data={provider.data}
        image={provider.image}
        imageAlt={provider.name}
      />
      <ProviderContent>
        <p>{provider.bio}</p>
      </ProviderContent>
      <h2>Tab Bar: Created {provider.data} NFTs</h2>
      <h1>NFTs from this provider</h1>
      <NftList nfts={props.nfts} />
    </Fragment>
  );
}

// gets a provider properties by the provider id
export async function getStaticProps(context) {
  const providerId = context.params.providerId;

  const provider = await getProviderById(providerId);
  const providerNfts = await getProviderNfts(providerId);

  return {
    props: {
      selectedProvider: provider,
      providerNfts: providerNfts,
    },
    revalidate: 1800,
  };
}

// gets a provider id by the path queried
export async function getStaticPaths() {
  const providers = await getAllProviders();

  const paths = providers.map((provider) => ({ params: { providerId: provider.id } }));

  return {
    paths: paths,
    // let getstatic know if there are more paths
    fallback: "blocking",
  };
}

export default ProviderDetailPage;