import Image from 'next/image'
import clsx from 'clsx'
import { Button } from 'components/form'
import { StatPair } from 'components/common'
import { PlusIcon } from 'components/icons'
import styles from './provider-summary.module.css'

const ProviderSummary = ({ name, twitter, website, bio, data, image }) => {
  return (
    <section className={styles.provider}>
      <div className={styles.provider__image}>
        <Image
          src="/partage.png"
          alt="Partage Logo"
          width={510}
          height={510}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="container">
        <div className={styles.provider__summary}>
          <div className={styles.provider__avatar}>
            <Image
              src={`/${image}`}
              alt={name}
              width={120}
              height={120}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <h1 className="h2">{name}</h1>
          <div className={styles.provider__action}>
            <Button label="0xc0E3...B79C" icon={<PlusIcon />} />
            <Button variant="outline" label="Follow" icon={<PlusIcon />} />
          </div>

          <div className={styles.provider__stat}>
            <StatPair label="Volume" data="250k+" />
            <StatPair label="NFTs Sold" data="50+" />
            <StatPair label="Followers" data="3000+" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProviderSummary
