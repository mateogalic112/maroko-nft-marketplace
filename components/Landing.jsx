import { Container, Grid, GridItem, Text, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState, useCallback } from "react";
import NftCard from "./NftCard";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Landing() {
  const [totalMinted, setTotalMinted] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [nftContract, setNftContract] = useState(null)
  const [signer, setSigner] = useState(null)

  const getContractBalance = useCallback(async () => {
    setContractBalance(await nftContract.getBalance())
  }, [nftContract])

  const collectMoney = useCallback(async () => {
    return await nftContract.transferFunds()
  }, [nftContract])

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setSigner(signer)
    const contract = new ethers.Contract(contractAddress, NFT.abi, signer);
    setNftContract(contract)

    const count = await contract.count();
    setTotalMinted(parseInt(count));
  };

  return (
    <Container>
      <Text>{}</Text>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <GridItem key={idx} w="100%" h="10" bg="blue.500">
              <NftCard 
                tokenId={idx}
                getCount={getCount}
                contract={nftContract}
                signer={signer}
                count={totalMinted}
              />
            </GridItem>
            
          ))}
      </Grid>
      <div style={{height: "10rem"}} />
      <h1>{contractBalance.toString()}</h1>
      <Button onClick={getContractBalance}>
              Contract balance
            </Button>
            <div style={{ height: "2rem" }} />
    <Button onClick={collectMoney}>
              Collect money
            </Button>
    </Container>
  );
}

export default Landing;
