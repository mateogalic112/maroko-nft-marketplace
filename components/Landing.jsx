import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import useFetchMyNfts from "../hooks/useFetchMyNfts";
import NftCard from "./NftCard";
import { NFT_TOTAL } from "../utils/constants";

const totalNfts = [...Array(NFT_TOTAL).keys()];

function Landing() {
  const [filterMyNtfs, setFilterByNfts] = useState(false);

  const { myNfts, getMyNfts } = useFetchMyNfts();

  const myNftFilter = useMemo(
    () =>
      filterMyNtfs
        ? totalNfts.filter((nft) => myNfts.includes(nft.toString()))
        : totalNfts,
    [filterMyNtfs, myNfts]
  );

  return (
    <Box>
      <Button
        onClick={() => setFilterByNfts((f) => !f)}
        sx={{ marginBottom: "2rem" }}
      >
        My nfts {myNfts.length}
      </Button>
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        {myNftFilter.map((n, idx) => (
          <GridItem key={idx} colSpan={[12, 6, 4, 3]}>
            <NftCard tokenId={n} getMyNfts={getMyNfts} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default Landing;
