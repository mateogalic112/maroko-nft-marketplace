import { useEffect, useState, useCallback } from "react";
import { useWalletContext } from "../context/wallet";

import useContract from "./useContract";

const useFetchMyNfts = (count) => {
  const { contract } = useContract()

  const [myNfts, setMyNfts] = useState([])

  const { account } = useWalletContext()

  const getMyNfts = useCallback(async () => {
    try {
      setMyNfts((await contract.fetchMyNfts())?.map(id => id.toString()))
    } catch (e) {
      setMyNfts([])
    }
  }, [contract]);
  
  useEffect(() => {
    getMyNfts();
  }, [getMyNfts, count, account]);

  return { getMyNfts, myNfts }
};

export default useFetchMyNfts;
