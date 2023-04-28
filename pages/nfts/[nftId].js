// the single NFT detail page
import { Fragment } from "react";
import Head from 'next/head';

import { getNftById, getHighlightedNfts } from "../../helpers/api-util";
import NftSummary from "../../components/nft-detail/nft-summary";
import NftLogistics from "../../components/nft-detail/nft-logistics";
import NftContent from "../../components/nft-detail/nft-content";

import Comments from '../../components/input/comments';

function NftDetailPage(props) {
  const nft = props.selectedNft;

  if (!nft) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{nft.name}</title>
        <meta
          name="description"
          content={nft.description}
        />
      </Head>
      <NftSummary title={nft.name} />
      <NftLogistics
        category={nft.category}
        provider={nft.provider}
        image={nft.image}
        imageAlt={nft.name}
      />
      <NftContent>
        <p>{nft.description}</p>
      </NftContent>
      <Comments nftId={nft.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const nftId = context.params.nftId;

  const nft = await getNftById(nftId);

  return {
    props: {
      selectedNft: nft,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const nfts = await getHighlightedNfts();

  const paths = nfts.map((nft) => ({ params: { nftId: nft.id } }));

  return {
    paths: paths,
    // let getstatic know if there are more paths
    fallback: "blocking",
  };
}

export default NftDetailPage;
