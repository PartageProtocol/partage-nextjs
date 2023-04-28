import classes from './provider-summary.module.css';

function ProviderSummary(props) {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default ProviderSummary;