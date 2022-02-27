import { Box, Flex, Button, Image, Container, Text } from "@chakra-ui/react";
import { RepeatIcon, UnlockIcon } from "@chakra-ui/icons";
import { Icon } from '@chakra-ui/react'
import { useWalletContext } from "../context/wallet";

export default function Navbar() {
  console.log("Navbar rendered");

  const {account, connectAccount} = useWalletContext()

  return (
    <Box bg={"rgb(21, 38, 63, 0.25)"} sx={{ position: "fixed" }} w="100%">
      <Container maxW={"container.lg"} position="relative">
        <Flex wrap gap={4} py={2} alignItems={"center"} justifyContent={"space-between"}>
          <Image src={"/logo.svg"} w={10} h={10} alt="logo" />
          {!account ? (
            <Button
              onClick={connectAccount}
              variant={"solid"}
              size={"sm"}
              leftIcon={<RepeatIcon />}
              bgColor={"cyan.300"}
              _hover={{ bg: "cyan.500" }}
            >
              Connect wallet
            </Button>
          ) : (
            <Flex alignItems='center' gap={3} p={2} bg={"rgb(21, 38, 63, 0.5)"}>
              <Icon color='gray.400' as={UnlockIcon} />
              <Text fontFamily='mono' color='gray.400' isTruncated>{`${account.substring(0, 8)}...${account.substr(-8)}`}</Text>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
