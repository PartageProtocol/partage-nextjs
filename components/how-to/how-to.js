import HowCard from "./how-card";
import classes from "./how-to.module.css";

function HowTo(props) {
  const cards = [
    {
      img: "./images/site/wallet.png",
      title: "Setup Your wallet",
      text: "Connect your prefered STX wallet by clicking the Connect Wallet button in the top of this page.",
    },
    {
      img: "./images/site/browse.png",
      title: "Browse categories",
      text: "Browse the whole available items in the markeplace or refine your research by category.",
    },
    {
      img: "./images/site/purchase.png",
      title: "Purchase NFTs",
      text: "Purchase timeshares in our selection of utility NFTs and redeem it from the utility provider.",
    },
  ];

  return (
    <section className={classes.container}>
      <h2>How it works</h2>
      <p>Find out how to get started</p>
      <ul>
        {cards.map((card, index) => (
          <HowCard
            img={card.img}
            title={card.title}
            text={card.text}
          />
        ))}
      </ul>
    </section>
  );
}

export default HowTo;
