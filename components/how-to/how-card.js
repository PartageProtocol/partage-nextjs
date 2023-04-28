import classes from "./how-to.module.css";

function HowCard({ img, title, text }) {
  return (
    <div className="card">
      <figure className="card__img">
        <img src={img} alt="img" />
      </figure>
      <div className="card__info">
        <h3 className="card__title">{title}</h3>
        <p className="card__text">{text}</p>
      </div>
    </div>
  );
}

export default HowCard;