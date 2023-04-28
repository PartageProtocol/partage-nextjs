import classes from './provider-content.module.css';

function ProviderContent(props) {
  return (
    <section className={classes.content}>
      {props.children}
    </section>
  );
}

export default ProviderContent;