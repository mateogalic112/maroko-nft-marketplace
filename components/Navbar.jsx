import {
  Box,
  Flex,
  Button,
  Image,
  Container
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

export default function Navbar() {
  return (
    <Box bg={"rgb(21, 38, 63, 0.25)"} sx={{ position: 'fixed' }} w='100%'>
      <Container maxW={'container.lg'} position='relative'>
        <Flex py={2} alignItems={"center"} justifyContent={"space-between"}>
            <Image src={'/logo.svg'} w={10} h={10} alt='logo' />
            <Button
                variant={"solid"}
                size={"sm"}
                leftIcon={<RepeatIcon />}
                bgColor={'cyan.300'}
                _hover={{ bg: "cyan.500" }}
            >
                Connect wallet
            </Button>
        </Flex>
      </Container>
    </Box>
  );
}
