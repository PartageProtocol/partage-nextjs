import Hero from './hero'
import Guide from './guide'
import TrendingNfts from './trending-nfts'

const Home = ({ nfts }) => {
  return (
    <>
      <Hero />
      <TrendingNfts nfts={nfts} />
      <Guide />
    </>
  )
}

export default Home
