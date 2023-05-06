import clsx from 'clsx'
import styles from './nft-collection.module.css'
import NftList from 'components/nft-list'

const NftCollections = ({ nfts }) => {
  return (
    <section className={styles.nfts}>
      <div className="container">
        <NftList nfts={nfts} />
      </div>
    </section>
  )
}

export default NftCollections
