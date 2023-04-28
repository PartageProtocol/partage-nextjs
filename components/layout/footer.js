import Link from "next/link";

import classes from "./footer.module.css";

import Button from "../ui/button";
import DiscordIcon from "../icons/discord-icon";
import YoutubeIcon from "../icons/youtube-icon";
import TwitterIcon from "../icons/twitter-icon";
import InstagramIcon from "../icons/instagram-icon";

function MainFooter() {
  return (
  <footer className={classes.footer}>
    <div className={classes.container}>
      <h2>Get our news in your feed</h2>
      <ul className="footer__links">
        <a
          target="_blank "
          href="https://discord.com/invite/kxhnEMfTFW"
          className="footer__link"
        >
          <DiscordIcon />
        </a>
        <a
          target="_blank "
          href="https://www.youtube.com/@partage_btc"
          className="footer__link"
        >
          <YoutubeIcon />
        </a>
        <a
          target="_blank "
          href="https://twitter.com/partage_btc"
          className="footer__link"
        >
          <TwitterIcon />
        </a>
        <a
          target="_blank "
          href="https://www.instagram.com/partage.btc/"
          className="footer__link"
        >
          <InstagramIcon />
        </a>
      </ul>
      <a
        href="https://t.me/partagebtc"
        target="_blank"
        rel="noopener noreferrer"
      >
        Created by{" Ⓒ Partage, 2023"}
      </a>
    </div>
  </footer>
  );
}

export default MainFooter;
