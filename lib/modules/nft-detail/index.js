import NftBanner from './nft-banner'
import NftInfo from './nft-info'

const NftDetail = ({ nft }) => {
  return (
    <>
      <NftBanner image={nft.image} title={nft.name} />
      <NftInfo {...nft} />
    </>
  )
}

export default NftDetail
