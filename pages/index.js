import Balance from "../components/Balance";
import { Text, Stack, Container } from "@chakra-ui/react";
import Landing from "../components/Landing";

export default function Home() {
  return (
    <Container>
      <Stack spacing={3}>
        <Text fontSize="2xl">In love with React & Next</Text>
      </Stack>

      <Balance />

      <Landing />
    </Container>
  );
}
