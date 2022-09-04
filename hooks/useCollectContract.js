import { useCallback } from "react";

const useCollectContract = (contract) => {
  const collectMoney = useCallback(async () => {
    if (!contract) return;

    return await contract.transferFunds();
  }, [contract]);

  return { collectMoney };
};

export default useCollectContract;
