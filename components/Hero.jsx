import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Center,
  Image,
} from "@chakra-ui/react";

export default function Hero() {
  console.log("Hero rendered");

  return (
    <Container maxW="container.xl" px={0}>
      <Flex wrap gap={8}>
        <Stack
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          flex="1.5"
        >
          <Heading
            fontWeight={700}
            fontSize={{ base: "3xl", sm: "4xl", md: "7xl" }}
            lineHeight={"110%"}
            color={"white"}
          >
            Maroko{" "}
            <Text as={"span"} color={"#00FFF8"}>
              Marketplace
            </Text>
          </Heading>
          <Text
            fontWeight={600}
            fontStyle="oblique"
            fontSize={{ base: "lg", md: "2xl" }}
            color={"white"}
            maxW={"3xl"}
          >
            Conquer your imagination, explore cool ideas, support great art!
          </Text>
          <Stack spacing={6} direction={"row"}>
            <Button
              rounded={"full"}
              px={6}
              backgroundColor={"cyan.300"}
              bg={"orange.400"}
              _hover={{ bg: "cyan.500" }}
            >
              Get started
            </Button>
            <Button rounded={"full"} px={6}>
              Learn more
            </Button>
          </Stack>
        </Stack>
        <Center flex="1">
          <Image src="/matic.png" alt="MATIC" opacity={0.5} />
        </Center>
      </Flex>
    </Container>
  );
}
