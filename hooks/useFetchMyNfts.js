import { useEffect, useState } from "react";
import { useWalletContext } from "../context/wallet";

import useTotalMinted from "./useTotalMinted";

const useFetchMyNfts = () => {
  const [myNfts, setMyNfts] = useState([])

  const { account,contract } = useWalletContext()
  const { totalMinted } = useTotalMinted()
  
  useEffect(() => {
    const getMyNfts = async () => {
      try {
        setMyNfts((await contract.fetchMyNfts())?.map(id => id.toString()))
      } catch (e) {
        setMyNfts([])
      }
    }

    getMyNfts()
  }, [totalMinted, account, contract]);

  return { myNfts }
};

export default useFetchMyNfts;
