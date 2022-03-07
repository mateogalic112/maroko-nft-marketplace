import {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useCallback,
  useEffect
} from "react";
import walletReducer from "./reducer";
import { ethers } from "ethers";

const WalletContext = createContext();

const initalState = {
  account: null,
};

function WalletProvider({ children }) {
  const [{ account }, dispatch] = useReducer(walletReducer, initalState);

  const connectAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    dispatch({
      type: "ADD_ACCOUNT",
      payload: accounts[0],
    });
  };

  const handleAccountChange = useCallback((accounts) => {
      const payload = accounts.length > 0 ? accounts[0] : null;

      dispatch({
        type: "ACCOUNT_CHANGE",
        payload,
      });
  }, []);

  const getAccountBalance = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return await provider.getBalance(account)
  }, [account]) 

  const mintToken = async (contract, signer, metadataUri, metadata, getCount) => {
      if (!contract || !signer || !metadataUri) return;
      const formattedPrice = ethers.utils.parseEther(metadata.price.toString());
      const result = await contract.payToMint(metadataUri, formattedPrice, {
        value: formattedPrice,
      });
  
      await result.wait();
      getCount();
  }

  useEffect(() => {
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    ethereum.on("accountsChanged", (accounts) => {
      handleAccountChange(accounts);
    });
  }, [handleAccountChange]);

  const value = useMemo(
    () => ({
      account,
      dispatch,
      connectAccount,
      handleAccountChange,
      mintToken,
      getAccountBalance
    }),
    [account, handleAccountChange, getAccountBalance]
  );
  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

export { WalletProvider, useWalletContext };
