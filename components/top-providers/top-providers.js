import ProviderList from "../providers/provider-list";
import classes from "./top-providers.module.css";

function TopProviders(props) {
  return (
    <section className={classes.latest}>
      <h2>Top Utility Providers</h2>
      <p>Checkout Our Top Rated Utility Providers.</p>
      <ProviderList providers={props.providers} />
    </section>
  );
}

export default TopProviders;