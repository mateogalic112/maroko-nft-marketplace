import {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useCallback,
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
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    dispatch({
      type: "ADD_ACCOUNT",
      payload: accounts[0],
    });
  };

  const isWalletConnected = useCallback(async () => {
    if (!window.ethereum) {
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (!accounts.length) {
      return;
    }

    await connectAccount();
  }, []);

  const handleAccountChange = () => {
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }

    window?.ethereum?.on("accountsChanged", (accounts) => {
      const payload = accounts.length > 0 ? accounts[0] : null;

      dispatch({
        type: "ACCOUNT_CHANGE",
        payload,
      });
    });
  };

  const mintToken = async (contract, signer, metadataUri) => {
      if (!contract || !signer || !metadataUri) return;
      const connection = contract.connect(signer);
      const addr = connection.address;
      const formattedPrice = ethers.utils.parseEther(metadata.price.toString());
      const result = await contract.payToMint(addr, metadataUri, formattedPrice, {
        value: formattedPrice,
      });
  
      await result.wait();
      // getMintedStatus();
      // getCount();
  }

  const value = useMemo(
    () => ({
      account,
      dispatch,
      connectAccount,
      isWalletConnected,
      handleAccountChange,
      mintToken
    }),
    [account, isWalletConnected]
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
