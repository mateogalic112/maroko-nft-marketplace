import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import useCount from "../hooks/useCount";
import useFetchMyNfts from "../hooks/useFetchMyNfts";
import NftCard from "./NftCard";

function Landing() {
  const { getCount, nftContract, signer, totalMinted } = useCount()
  const [filterMyNtfs, setFilterByNfts] = useState(false)

  const { myNfts } = useFetchMyNfts()
  let nftIds = [...Array(6).keys()]

 if(filterMyNtfs) {
  nftIds = nftIds.filter(item => myNfts.includes(item.toString()))
 }

  return (
    <Box>
      <Button onClick={() => setFilterByNfts(!filterMyNtfs)} sx={{ marginBottom: '2rem' }} >My nfts{" "}{myNfts.length}</Button>
      <Grid templateColumns='repeat(12, 1fr)' gap={4}>
        {nftIds
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
