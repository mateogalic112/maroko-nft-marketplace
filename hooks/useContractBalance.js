import { useState, useCallback, useEffect } from "react";
import { useWalletContext } from "../context/wallet";
import useTotalMinted from "./useTotalMinted";

const useContractBalance = () => {
  const [contractBalance, setContractBalance] = useState(0);

  const { contract } = useWalletContext()
  const { totalMinted } = useTotalMinted()

  const getContractBalance = useCallback(async () => {
    if (!contract) return

    setContractBalance(await contract.getBalance());
  }, [contract]);

  useEffect(() => {
    getContractBalance()
  }, [getContractBalance, totalMinted, contract])

  return { contractBalance, getContractBalance }
}

export default useContractBalance