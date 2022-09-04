import {
  Box,
  Text,
  Button,
  HStack,
  Flex,
  Image,
  Heading,
  Spacer,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import useMintedStatus from "../hooks/useMintedStatus";
import useMetadata from "../hooks/useMetadata";
import TransferModal from "./TransferModal";
import { useWalletContext } from "../context/wallet";
import { NFT_CONTRACT_CONFIG } from "../config/env";

function NftCard({ tokenId, getMyNfts }) {
  const metadataUri = `${NFT_CONTRACT_CONFIG.ipfsGateway}/${NFT_CONTRACT_CONFIG.ipfsJsonCid}/${tokenId}.json`;

  const { metadata } = useMetadata(metadataUri);
  const { mintToken, account, contract } = useWalletContext();
  const { isMinted, getMintedStatus } = useMintedStatus(metadataUri);

  const { onOpen, isOpen, onClose } = useDisclosure();

  const mintNft = async () => {
    try {
      await mintToken(contract, metadataUri, metadata);
      await getMintedStatus();
      await getMyNfts();
      onOpen();
    } catch (err) {}
  };

  const textColor = "#8BACD9";

  if (!metadata)
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
        boxShadow="0 0 2px #7FB083"
        transition="box-shadow 0.2s"
        _hover={{
          boxShadow: "0 0 5px #7FB083",
        }}
      >
        <Center h="100%">
          <Heading
            as="h5"
            fontSize="16px"
            mb={4}
            cursor="pointer"
            _hover={{
              color: "#00FFF8",
            }}
            textAlign="center"
          >
            IPFS loading... Try refresh
          </Heading>
        </Center>
      </Box>
    );

  return (
    <>
      <Box
        display="flex"
        maxW={280}
        h="100%"
        bg="#15263F"
        color="white"
        borderRadius="2xl"
        p={6}
        flexDirection="column"
        boxShadow="0 0 2px #7FB083"
        transition="box-shadow 0.2s"
        _hover={{
          boxShadow: "0 0 5px #7FB083",
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

      <TransferModal
        isOpen={isOpen}
        onClose={onClose}
        nft={metadata.name}
        to={account}
      />
    </>
  );
}

export default NftCard;
