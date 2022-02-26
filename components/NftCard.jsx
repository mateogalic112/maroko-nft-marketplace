import { ethers } from "ethers";
import { useEffect } from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  Flex,
  Image,
  Center,
  Heading,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import {
  IPFS_IMAGE_CID,
  IPFS_JSON_CID,
  IPFS_GATEWAY,
} from "../utils/constants";
import { useState, useCallback } from "react";
import axios from "axios";

function NftCard({ tokenId, getCount, contract, signer, count }) {
  const metadataUri = `${IPFS_GATEWAY}/${IPFS_JSON_CID}/${tokenId}.json`;
  const imageUri = `${IPFS_GATEWAY}/${IPFS_IMAGE_CID}/${tokenId}.png`;

  const [isMinted, setisMinted] = useState(false);
  const [metadata, setMetadata] = useState(null);

  const getMintedStatus = useCallback(async () => {
    const result = await contract.isContentOwned(metadataUri);
    console.log(result);
    setisMinted(result);
    console.log(parseInt(await contract.count()));
  }, [contract, metadataUri]);

  useEffect(() => {
    if (contract) {
      getMintedStatus();
    }
  }, [contract, count, getMintedStatus]);

  useEffect(() => {
    const getMetadata = async () => {
      const response = await axios.get(metadataUri).then((res) => res.data);
      setMetadata(response);
    };

    getMetadata();
  }, [metadataUri]);

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const formattedPrice = ethers.utils.parseEther(metadata.price.toString());
    console.log("formatted price", formattedPrice);
    console.log("addr", addr);
    console.log("metadata", metadataUri);
    const result = await contract.payToMint(addr, metadataUri, formattedPrice, {
      value: formattedPrice,
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getUri() {
    console.log(await contract.tokenURI(tokenId));
  }

  const textColor = "#8BACD9";

  if (!metadata) return <h1>Loading...</h1>;

  return (
    <Box
      display="flex"
      maxW={280}
      h="100%"
      bg="#15263F"
      color="white"
      borderRadius="2xl"
      p={6}
      flexDirection="column"
    >
      <Box position="relative" mb={4}>
        <Image
          src={imageUri}
          cursor="pointer"
          alt="NFT image"
          h={160}
          margin="0 auto"
        ></Image>
      </Box>
      <Heading
        as="h2"
        fontSize="22px"
        mb={4}
        cursor="pointer"
        _hover={{
          color: "#00FFF8",
        }}
      >
        {metadata.name} #3429
      </Heading>
      <Text color={textColor} mb={6} fontSize="18px">
        {metadata.description}
      </Text>
      <Spacer />
      <HStack justify="space-between" mb={4}>
        <Flex align="center">
          <Image
            src={"/matic.png"}
            marginRight="6px"
            height="16px"
            alt="MATIC logo"
          ></Image>
          <Text color="#00FFF8" fontWeight="bold">
            {`${metadata.price} MATIC`}
          </Text>
        </Flex>
      </HStack>
      {isMinted ? (
        <Button
          _hover={{
            border: "1px solid #00FFF8",
            color: "white",
          }}
          w="100%"
          color="white"
          background="#15263F"
          disabled
        >
          MINTED!
        </Button>
      ) : (
        <Button
          _hover={{
            background: "#15263F",
            border: "1px solid #00FFF8",
          }}
          background="#8247E5"
          w="100%"
          variant="solid"
          onClick={mintToken}
          color="white"
          transition="background 0.2s"
        >
          MINT
        </Button>
      )}
    </Box>
  );
}

export default NftCard;
