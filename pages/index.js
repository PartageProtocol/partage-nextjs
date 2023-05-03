/* a homepage usually stays relatively lean,
it doesn't have a dedicated css but uses global.css
and focuses on collecting the data from other components.

Partage's Homepage layer:
1) Nav bar
2) Hero => Present ourselves
3) Hero bis => How it works
4) Highlights: Trending Collections
5) Highlights: Top Rated Creators
6) Subscribe to newsletter
7) Footer
*/

import { Fragment } from 'react'
import { useRef, useState } from 'react'

import Head from 'next/head'

import {
  getHighlightedNfts,
  getHighlightedProviders,
} from '../helpers/api-util'

import Home from '@/modules/home'
import TrendingNFTs from '../components/trending-nfts/trending-nfts'
import TopProviders from '../components/top-providers/top-providers'

import NewsletterRegistration from '../components/input/newsletter-registration'

function HomePage(props) {
  const [emailItems, setEmailItems] = useState([])

  const emailInputRef = useRef()

  function submitFormHandler(nft) {
    nft.preventDefault()

    const enteredEmail = emailInputRef.current.value

    const reqBody = { email: enteredEmail }

    // send push entered email request to api
    fetch('/api/emails', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // extracting the response data
      .then((response) => response.json())
      // log in the data
      .then((data) => console.log(data))
  }

  function loadEmailHandler() {
    // send a get request by passing url
    fetch('/api/emails')
      .then((response) => response.json())
      .then((data) => {
        setEmailItems(data.email)
      })
  }

  return (
    <Fragment>
      <Head>
        <title>Partage NFTs</title>
        <meta
          name="description"
          content="Shared NFT Utilities built on the Bitcoin blockchain."
        />
      </Head>
      <Home />
      <TopProviders providers={props.providers} />
      <TrendingNFTs nfts={props.nfts} />
      <NewsletterRegistration />
    </Fragment>
  )
}

export async function getStaticProps() {
  const highlightedNfts = await getHighlightedNfts()
  const highlightedProviders = await getHighlightedProviders()

  return {
    props: {
      nfts: highlightedNfts,
      providers: highlightedProviders,
    },
    // update page every 10 min
    revalidate: 1800,
  }
}

export default HomePage
