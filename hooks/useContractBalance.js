import { useState, useCallback, useEffect } from "react";
import { useWalletContext } from "../context/wallet";

const useContractBalance = () => {
  const [contractBalance, setContractBalance] = useState(0);

  const { contract } = useWalletContext()

  const getContractBalance = useCallback(async () => {
    try {
      setContractBalance(await contract.getBalance());
    } catch (e) {}
  }, [contract]);

  useEffect(() => {
    getContractBalance()
  }, [getContractBalance, contract])

  return { contractBalance, getContractBalance }
}

export default useContractBalance