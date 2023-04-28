import classes from './nft-summary.module.css';

function NftSummary(props) {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default NftSummary;