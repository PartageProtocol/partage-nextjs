import NftBanner from './nft-banner'
import NftInfo from './nft-info'

const NftDetail = ({ nft }) => {
  console.log(nft)
  return (
    <>
      <NftBanner image={nft.image} title={nft.name} />
      <NftInfo {...nft} />
      {/* <div></div> */}
    </>
  )
}

export default NftDetail
