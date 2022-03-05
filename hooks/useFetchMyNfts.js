import { useEffect, useState, useCallback } from "react";

import useContract from "./useContract";
import useCount from "./useCount";

const useFetchMyNfts = () => {
  const { contract } = useContract()

  const [myNfts, setMyNfts] = useState([])
  const {totalMinted } = useCount()

  const getMyNfts = useCallback(async () => {
    try {
      setMyNfts((await contract.fetchMyNfts())?.map(id => id.toString()))
    } catch (e) {
      setMyNfts([])
    }
  }, [contract]);
  
  useEffect(() => {
    getMyNfts();
  }, [totalMinted, getMyNfts]);

  return { getMyNfts, myNfts }
};

export default useFetchMyNfts;
