import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { CONTRACT_ADDRESS } from "../utils/constants";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

const useCount = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  const [nftContract, setNftContract] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    if (!window?.ethereum) {
      window.alert("No wallet found!");
      return;
    } else if (!ethereum.isConnected()) {
      window.alert("Connect wallet!");
      return;
    }

    console.log(ethereum.isConnected());
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setSigner(signer);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, NFT.abi, signer);
    setNftContract(contract);

    let count
    try {
      count = await contract.count()
      setTotalMinted(parseInt(count));
    } catch (e) {
      setTotalMinted(0)
    }
  };

  return { totalMinted, nftContract, signer, getCount }
};

export default useCount;
