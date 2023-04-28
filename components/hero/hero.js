import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className="hero__left">
        <h1 className="hero__title">
          Shared <br /> NFT Utilities
        </h1>
        <h2 className="hero__subtitle">
          Get the most out of fractionalization
        </h2>
      </div>
      <div className="hero__right">
        <Image
          src="/partage.png"
          alt="Partage Logo"
          width={510}
          height={510}
        />
      </div>
    </section>
  );
}

export default Hero;
