// the single NFT detail page
import { Fragment } from "react";
import { useRouter } from "next/router";

import path from "path";
import fs from "fs/promises";

function NftPage(props) {
  const { loadedProduct } = props;

  // needed if fallback: true
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  const router = useRouter();

  const pid = router.query.pid;

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}
async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathWithParams,
    // tell nextjs even pages not listed above can be valid
    // they're just not pre-generated but generated when asked
    fallback: true,
  };
}

export default NftPage;
