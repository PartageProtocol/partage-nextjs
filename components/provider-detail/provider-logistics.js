import Image from "next/image";

import CategoryIcon from "../icons/category-icon";
import LogisticsItem from "./logistics-item";
import classes from "./provider-logistics.module.css";

function ProviderLogistics(props) {
  const { data, image, imageAlt } = props;

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width={200} height={200} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={CategoryIcon}>
          <h3>{data}</h3>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default ProviderLogistics;
