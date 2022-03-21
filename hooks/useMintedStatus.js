import { useState, useEffect, useCallback } from 'react'
import { useWalletContext } from '../context/wallet';

const useMintedStatus = (metadataUri) => {
    const [isMinted, setisMinted] = useState(false);

    const { account, contract } = useWalletContext()

    const getMintedStatus = useCallback(async () => {
      let result
      try {
        result = await contract.isContentOwned(metadataUri);
        setisMinted(result)
      } catch (e) {
        setisMinted(false)
      }
    }, [contract, metadataUri])

  useEffect(() => {
    getMintedStatus();
  }, [account, getMintedStatus]);

  return { isMinted, getMintedStatus }
}

export default useMintedStatus