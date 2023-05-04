import Link from 'next/link'
import DiscordIcon from 'components/icons/discord-icon'
import YoutubeIcon from 'components/icons/youtube-icon'
import TwitterIcon from 'components/icons/twitter-icon'
import InstagramIcon from 'components/icons/instagram-icon'
import styles from './footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__container}>
          <div className={styles.footer__social}>
            <div className={styles.footer__logo}>
              <Link href="/">
                <div className={styles.logo}>Partage</div>
              </Link>
            </div>

            <p>Shared NFT Utilities, built on Bitcoin</p>

            <div className={styles.footer__social__community}>
              <p>Join our social medias</p>

              <ul>
                <li>
                  <a
                    target="_blank "
                    href="https://discord.com/invite/kxhnEMfTFW"
                    className="footer__link"
                  >
                    <DiscordIcon />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank "
                    href="https://www.youtube.com/@partage_btc"
                    className="footer__link"
                  >
                    <YoutubeIcon />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank "
                    href="https://twitter.com/partage_btc"
                    className="footer__link"
                  >
                    <TwitterIcon />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank "
                    href="https://www.instagram.com/partage.btc/"
                    className="footer__link"
                  >
                    <InstagramIcon />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footer__explore}>
            <h3>Explore</h3>

            <ul>
              <li>
                <a href="/">Marketplace</a>
              </li>
              <li>
                <a href="/">Rankings</a>
              </li>
              <li>
                <a href="/">Connect a wallet</a>
              </li>
            </ul>
          </div>

          <div className={styles.footer__subscribe}>
            <h3>Join Our Weekly Digest</h3>

            <p>Get exclusive promotions & updates straight to your inbox.</p>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <a
            className="caption"
            href="https://t.me/partagebtc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by{` Ⓒ Partage, ${year}`}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
