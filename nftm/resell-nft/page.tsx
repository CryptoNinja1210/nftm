'use client'
/* pages/resell-nft.js */
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter, useSearchParams  } from 'next/navigation'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
  marketplaceAddress
} from 's/config'

import NFTMarketplace from 's/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

interface QueryParams {
  id: number,
  tokenURI: any,
}

export default function ResellNFT() {
  const [formInput, updateFormInput] = useState<{ price: string, image: string }>({ price: '', image: '' })
  const router = useRouter()
  const searchParams  = useSearchParams()!
  const { id, tokenURI } = searchParams as unknown as QueryParams
  const { image, price } = formInput

  useEffect(() => {
    fetchNFT()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function fetchNFT() {
    if (!tokenURI) return
    const meta = await axios.get(tokenURI)
    updateFormInput(state => ({ ...state, image: meta.data.image }))
  }

  async function listNFTForSale() {
    if (!price) return
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()

    listingPrice = listingPrice.toString()
    let transaction = await contract.resellToken(id, priceFormatted, { value: listingPrice })
    await transaction.wait()

    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        {
          image && (
            // eslint-disable-next-line @next/next/no-img-element
            // <img className="rounded mt-4" width="350" src={image} />
            <picture>
              <source srcSet={image} type="image/avif" />
              <source srcSet={image} type="image/webp" />
              <img
                className="rounded"
                src={image}
                alt="Landscape picture"
                width={350}
              />
            </picture>
          )
        }
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          List NFT
        </button>
      </div>
    </div>
  )
}