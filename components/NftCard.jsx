import {
  Box,
  Text,
  Button,
  HStack,
  Flex,
  Image,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import {
  IPFS_JSON_CID,
  IPFS_GATEWAY,
} from "../utils/constants";
import useMintedStatus from "../hooks/useMintedStatus";
import useMetadata from "../hooks/useMetadata";
import { useWalletContext } from "../context/wallet";

function NftCard({ tokenId }) {
  const metadataUri = `${IPFS_GATEWAY}/${IPFS_JSON_CID}/${tokenId}.json`;

  const { metadata } = useMetadata(metadataUri)
  const { mintToken, account, contract } = useWalletContext()
  const { isMinted, getMintedStatus } = useMintedStatus(metadataUri)

  const mintNft = async () => {
    await mintToken(contract, metadataUri, metadata)
    await getMintedStatus()
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
      boxShadow='0 0 2px #7FB083'
      transition='box-shadow 0.2s'
      _hover={{
        boxShadow: '0 0 5px #7FB083'
      }}
    >
      <Box position="relative" mb={4}>
        <Image
          src={metadata.image}
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
      ) : account ? (
        <Button
          _hover={{
            background: "#15263F",
            border: "1px solid #00FFF8",
          }}
          background="#8247E5"
          w="100%"
          variant="solid"
          onClick={mintNft}
          color="white"
          transition="background 0.2s"
        >
          MINT
        </Button>
      ) : null}
    </Box>
  );
}

export default NftCard;
