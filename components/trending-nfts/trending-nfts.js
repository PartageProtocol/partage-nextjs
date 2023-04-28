import NftList from "../nfts/nft-list";
import classes from "./trending-nfts.module.css";

function TrendingNfts(props) {
  return (
    <section className={classes.latest}>
      <h2>Trending NFTs</h2>
      <p>Checkout Our Most Trending NFTs.</p>
      <NftList nfts={props.nfts} />
    </section>
  );
}

export default TrendingNfts;
