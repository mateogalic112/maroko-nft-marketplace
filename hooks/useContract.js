import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../utils/constants";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

const useContract = () => {
const [contractBalance, setContractBalance] = useState(0);
  const [contract, setContract] = useState(null);

  const getContractBalance = useCallback(async () => {
    setContractBalance(await contract.getBalance());
  }, [contract]);

  const collectMoney = useCallback(async () => {
    return await contract.transferFunds();
  }, [contract]);

  useEffect(() => {
    contractInit();
  }, []);

  const contractInit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(CONTRACT_ADDRESS, NFT.abi, signer);
    setContract(nftContract);
  };

  return { contract, contractBalance, getContractBalance, collectMoney }
}

export default useContract