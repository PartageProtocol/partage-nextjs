// import NftInfo from './nft-info'
import ProviderSummary from './provider-summary'

const Provider = ({ provider }) => {
  return (
    <>
      <ProviderSummary {...provider} />
      {/* <NftInfo {...nft} /> */}
    </>
  )
}

export default Provider
