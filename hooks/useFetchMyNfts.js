import { useEffect, useState, useCallback } from "react";
import { useWalletContext } from "../context/wallet";

const useFetchMyNfts = () => {
  const [myNfts, setMyNfts] = useState([]);

  const { account, contract } = useWalletContext();

  const getMyNfts = useCallback(async () => {
    try {
      setMyNfts((await contract.fetchMyNfts())?.map((id) => id.toString()));
    } catch (e) {
      setMyNfts([]);
    }
  }, [contract]);

  useEffect(() => {
    getMyNfts();
  }, [account, contract, getMyNfts]);

  return { myNfts, getMyNfts };
};

export default useFetchMyNfts;
