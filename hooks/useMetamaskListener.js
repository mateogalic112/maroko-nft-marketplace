import { useEffect } from "react";
import { useWalletContext } from "../context/wallet";

const useMetamaskListener = () => {
  const { handleAccountChange, isWalletConnected } = useWalletContext();

  useEffect(() => {
    if (window.ethereum) {
        // isWalletConnected();

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      ethereum.on("accountsChanged", (accounts) => {
        handleAccountChange(accounts);
      });
    }

    return ()  => {
        ethereum.removeListener('accountsChanged', handleAccountChange)
    }
  }, [handleAccountChange, isWalletConnected]);
};

export default useMetamaskListener;
