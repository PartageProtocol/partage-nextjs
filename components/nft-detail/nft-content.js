import classes from './nft-content.module.css';

function NftContent(props) {

  return (
    <section className={classes.content}>
      {props.children}
    </section>
  );
}

export default NftContent;