// import { NextPage } from 'next'
import Link from 'next/link'

export const metadata = {
  title: 'Home NFTM',
  description: 'NFTMarketplace',
}

interface MyPageProps {
  children: React.ReactNode,
}

export default function RootLayout(props: MyPageProps)  {
  const { children } = props

  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Metaverse Marketplace</p>
        <div className="flex mt-4">
          <Link className="mr-6 text-pink-500" href="/nftm">
            Home
          </Link>
          <Link className="mr-6 text-pink-500" href="/nftm/create-nft">
            Sell NFT
          </Link>
          <Link className="mr-6 text-pink-500" href="/nftm/my-nfts">
            My NFTs
          </Link>
          <Link className="mr-6 text-pink-500" href="/nftm/dashboard">
            Dashboard
          </Link>
        </div>
      </nav>
      { children }
      {/* <Component {...pageProps} /> */}
    </div>
  )
}
