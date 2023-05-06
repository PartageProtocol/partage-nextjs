import Image from 'next/image'
import clsx from 'clsx'
import { Button } from 'components/form'
import { StatPair } from 'components/common'
import { RocketIcon } from 'components/icons'
import styles from './hero.module.css'

const Hero = () => {
  return (
    <section className="container section-y">
      <div className={styles.hero}>
        <div className={styles.hero__content}>
          <h1>Shared NFT Utilities</h1>
          <p>
            Partage v1 contains public functions to mint, burn, transfer,
            fractionalize NFTs, list and unlist fractions for sale, buy,
            transfer and burn fractions.
          </p>

          <div
            className={clsx(
              styles.hero__results,
              styles['hero__results--desktop']
            )}
          >
            <Button
              label="Get Started"
              icon={<RocketIcon />}
              className={styles.hero__cta}
            />

            <div className={styles.hero__data}>
              <StatPair label="Total Sale" data="240k+" />
              <StatPair label="Auctions" data="100k+" />
            </div>
          </div>
        </div>

        <div className={styles.hero__image}>
          <Image
            src="/partage.png"
            alt="Partage Logo"
            width={510}
            height={510}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div
          className={clsx(
            styles.hero__results,
            styles['hero__results--mobile']
          )}
        >
          <Button
            label="Get Started"
            icon={<RocketIcon />}
            className={styles.hero__cta}
          />

          <div className={styles.hero__data}>
            <StatPair label="Total Sale" data="240k+" />
            <StatPair label="Auctions" data="100k+" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
