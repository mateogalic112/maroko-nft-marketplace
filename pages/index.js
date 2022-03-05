import { Container, Box } from "@chakra-ui/react";
import Landing from "../components/Landing";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Admin from "../widgets/Admin";
import useMetamaskListener from "../hooks/useMetamaskListener";

export default function Home() {
  useMetamaskListener();

  return (
    <Box
      minH="100vh"
      sx={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      <div style={{ height: "4rem" }} />
      {/* <Admin /> */}

      <Container maxW="container.lg">
        <Hero />

        <Landing />
      </Container>
    </Box>
  );
}
