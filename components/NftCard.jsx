import { ethers } from "ethers";
import Image from "next/image";
import { useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react"
import { IPFS_IMAGE_CID, IPFS_JSON_CID, IPFS_GATEWAY } from "../utils/constants"
import { useState, useCallback } from "react"
import axios from "axios";

function NftCard({ tokenId, getCount, contract, signer, count }) {
    const metadataUri = `${IPFS_GATEWAY}/${IPFS_JSON_CID}/${tokenId}.json`
    const imageUri = `${IPFS_GATEWAY}/${IPFS_IMAGE_CID}/${tokenId}.png`

    const [isMinted, setisMinted] = useState(false)
    const [price, setPrice] = useState(null)

    const getMintedStatus = useCallback(async () => {
        const result = await contract.isContentOwned(metadataUri)
        console.log(result);
        setisMinted(result)
        console.log(parseInt(await contract.count()))
        ;
    }, [contract, metadataUri])

    useEffect(() => {
        if (contract) {
            getMintedStatus()
        }
    }, [contract, count, getMintedStatus])

    useEffect(() => {
        const getPrice = async () => {
            const metadata = await axios.get(metadataUri).then(res => res.data)
            setPrice(metadata.price)
        }

        getPrice()
    }, [metadataUri])


    const mintToken = async () => {
        const connection = contract.connect(signer);
        const addr = connection.address;
        const formattedPrice = ethers.utils.parseEther(price.toString())
        console.log("formatted price", formattedPrice);
        console.log("addr", addr);
        console.log("metadata", metadataUri);
        const result = await contract.payToMint(addr, metadataUri, formattedPrice, {
            value: formattedPrice
        })

        await result.wait()
        getMintedStatus()
        getCount()
    }

    async function getUri() {
        console.log(await contract.tokenURI(tokenId));
    }

    return (
        <Box>
            <Image alt={`NFT with id: ${tokenId}`} src={isMinted ? imageUri : "/vercel.svg"} height={60} width={60} />
            <Text fontSize="lg">ID #{tokenId}</Text>
            {
                isMinted ? (
                    <Button onClick={getUri}>
                        Taken! Show URI
                    </Button>
                ) : (
                    <Button onClick={mintToken}>
                        Mint
                    </Button>
                )
            }
        </Box>
    )
}

export default NftCard