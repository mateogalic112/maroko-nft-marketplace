import { useState, useEffect, useCallback } from 'react'
import { useWalletContext } from '../context/wallet';
import useTotalMinted from './useTotalMinted'

const useMintedStatus = (metadataUri) => {
    const [isMinted, setisMinted] = useState(false);

    const { totalMinted } = useTotalMinted()
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
  }, [totalMinted, account, getMintedStatus]);

  return { isMinted, getMintedStatus }
}

export default useMintedStatus