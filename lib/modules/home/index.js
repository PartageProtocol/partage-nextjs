import Hero from './hero'
import Guide from './guide'
import TrendingNfts from './trending-nfts'
import TopProviders from './top-providers'

const Home = ({ nfts, providers }) => {
  return (
    <>
      <Hero />
      <TrendingNfts nfts={nfts} />
      <TopProviders providers={providers} />
      <Guide />
    </>
  )
}

export default Home
