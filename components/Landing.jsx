import { Box, Grid, GridItem } from "@chakra-ui/react";
import useCount from "../hooks/useCount";
import NftCard from "./NftCard";

function Landing() {
  console.log("Landing rendered");

  const { getCount, nftContract, signer, totalMinted } = useCount()

  if (!signer) return <h1>No signer</h1>

  return (
    <Box>
      <Grid templateColumns='repeat(12, 1fr)' gap={4}>
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <GridItem key={idx} colSpan={[12, 6, 4, 3]}>
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
    </Box>
  );
}

export default Landing;
