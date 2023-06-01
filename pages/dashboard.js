import { getSession } from 'next-auth/react'

import ConnectWallet from '../components/ConnectWallet'
import UserProfile from '../components/profile/user-profile'
import Button from '../components/ui/button'

import { contractEvents } from '../helpers/contract-events'

function dashboardPage() {
  const {
    transferNFT,
    transfer,
    burn,
    fractionalize,
    burnFractions,
    getOverAllBalance,
    getBalance,
    listFractions,
    unlistFractions,
    listNft,
  } = contractEvents()

  return (
    <div>
      <UserProfile />
      <div>
        {/* ConnectWallet file: `../components/ConnectWallet.js` */}
        <ConnectWallet />
      </div>
      <div>
        <Button onClick={() => listNft()}>List NFT</Button>
        <Button>Unlist NFT</Button>
        <Button onClick={() => transferNFT()}>Transfer NFT</Button>
        <Button onClick={() => transfer()}>Transfer</Button>
        <Button onClick={() => burn()}>Burn NFT</Button>
        <Button onClick={() => fractionalize()}>Fractionalize NFT</Button>
        <Button onClick={() => listFractions()}>List Fractions</Button>
        <Button onClick={() => unlistFractions()}>Unlist Fractions</Button>
        <Button onClick={() => burnFractions()}>Burn Fractions</Button>
      </div>
      <div>
        <Button onClick={() => getBalance()}>Get balance</Button>
        <Button onClick={() => getOverAllBalance()}>Get overall balance</Button>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default dashboardPage
