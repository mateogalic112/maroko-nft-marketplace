import {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import walletReducer from "./reducer";
import { ethers } from "ethers";
import { abi } from "../../contracts/abi/NFT";
import { NFT_CONTRACT_CONFIG } from "../../config/env";

const WalletContext = createContext();

const initalState = {
  account: null,
  signer: null,
  contract: null,
};

function WalletProvider({ children }) {
  const [{ account, signer, contract }, dispatch] = useReducer(
    walletReducer,
    initalState
  );

  const connectAccount = useCallback(async () => {
    if (!window?.ethereum) return;

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      NFT_CONTRACT_CONFIG.contractAddress,
      abi,
      signer
    );

    dispatch({
      type: "ADD_ACCOUNT",
      payload: {
        account: accounts[0],
        signer,
        contract,
      },
    });
  }, []);

  useEffect(() => {
    if (window?.ethereum) {
      connectAccount();
    }
  }, [connectAccount]);

  const handleAccountChange = useCallback((accounts) => {
    const account = accounts.length > 0 ? accounts[0] : null;

    let newSigner = null;
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      newSigner = provider.getSigner();
    }

    dispatch({
      type: "ACCOUNT_CHANGE",
      payload: {
        account,
        signer: newSigner,
      },
    });
  }, []);

  const mintToken = async (contract, metadataUri, metadata) => {
    const formattedPrice = ethers.utils.parseEther(metadata.price.toString());
    try {
      const result = await contract.payToMint(metadataUri, formattedPrice, {
        value: formattedPrice,
      });

      await result.wait();
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", (accounts) => {
        handleAccountChange(accounts);
      });
    }
  }, [handleAccountChange]);

  const value = useMemo(
    () => ({
      account,
      signer,
      contract,
      dispatch,
      connectAccount,
      handleAccountChange,
      mintToken,
    }),
    [account, signer, contract, handleAccountChange, connectAccount]
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
