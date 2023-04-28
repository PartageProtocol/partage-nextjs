// use this page to filtered NFTs
import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getFilteredNfts } from "../../helpers/api-util";
import NftList from "../../components/nfts/nft-list";
import ResultsTitle from "../../components/nfts/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredNftsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredCategory = filterData[0];
  const filteredProvider = filterData[1];

  if (filteredCategory.length === 0 || filteredProvider.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
        <p>Invalid filter, please adjust your values.</p>
        <div className="center">
          <Button link="/nfts">Show All NFTs</Button>
        </div>
        </ErrorAlert>
      </Fragment>
    );
  }

  const filteredNfts = getFilteredNfts({
    category: filteredCategory,
    provider: filteredProvider,
  });

  console.log(filteredNfts);

  if (!filteredNfts || filteredNfts.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
        <p>No NFT found for the chosen filters.</p>
        <div className="center">
          <Button link="/nfts">Show All NFTs</Button>
        </div>
        </ErrorAlert>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>Filtered NFTs</title>
        <meta
          name="description"
          content="NFTs search according to user filters."
        />
      </Head>
      <ResultsTitle category={filteredCategory} provider={filteredProvider} />
      <NftList items={filteredNfts} />
    </Fragment>
  );
}

export default FilteredNftsPage;

/*
import { Fragment, useEffect, useState } from "react";

import useSWR from "swr";
import Head from "next/head";

import ResultsTitle from "../../components/nfts/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

-----function FilteredNftsPage(props) {
  const [loadedNfts, setLoadedNfts] = useState();
  ----const router = useRouter();

  ----const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://partage-v1-default-rtdb.firebaseio.com/nfts.json"
  );

  useEffect(() => {
    if (data) {
      const nfts = [];

      for (const key in data) {
        nfts.push({
          id: key,
          // not manually write all data but use ...
          ...data[key],
        });
      }

      setLoadedNfts(nfts);
    }
  }, [data]);

  let pageHeadData = <Head>
    <title>Filtered Nfts</title>
      <meta
        name="description"
        content={`A list of filtered NFTs.`}
      />
  </Head>;

  if (!loadedNfts) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const filteredCategory = filterData [0];

  pageHeadData = (
    <Head>
      <title>Filtered Nfts</title>
      <meta
        name="description"
        content={`All shared ${nft.category} NFT Utilities built on the Bitcoin blockchain.`}
      />
    </Head>
  );

  if (isNaN(filteredData) || error) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your research!</p>
          <div className="center">
            <Button link="/nfts">Show All NFTs</Button>
          </div>
        </ErrorAlert>
      </Fragment>
    );
  }

  const filteredNfts = loadedNfts.filter((nft) => {
    const nftFilter = new Filter(nft.category);
    return nftFilter === nft.category;
  });


  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle category={filteredData} />
      <NftList items={filteredNfts} />
    </Fragment>
  );
}

/* server-side props doesn't make sense if we have get static props 
export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredCategory = filterData[0];
  const filteredProvider = filterData[1];

  if (isNaN(filterData[0]) || isNaN(filterData[1])) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const filteredNfts = await getFilteredNfts({
    category: category,
    provider: provider,
  });

  return {
    props: {
      nfts: filteredNfts,
      category: category,
      provider: provider,
    },
    revalidate: 60,
  };

export default FilteredNftsPage;
} */
