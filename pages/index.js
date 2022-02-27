import Balance from "../components/Balance";
import { Container, Box } from "@chakra-ui/react";
import Landing from "../components/Landing";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useWalletContext } from "../context/wallet";

export default function Home() {
  const { isWalletConnected, handleAccountChange } = useWalletContext()

  useEffect(() => {
    isWalletConnected()
  }, [isWalletConnected])

  useEffect(() => {
    ethereum.on('accountsChanged', (accounts) => {
      handleAccountChange(accounts)
    });
  }, [handleAccountChange])

  return (
    <Box
      minH="100vh"
      sx={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundAttachment: 'fixed' }}
    >
      <Navbar />
      <Container maxW="container.lg">
        <Hero />

        {/* <Balance /> */}

        <Landing />
      </Container>
    </Box>
  );
}
