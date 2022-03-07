import { useState, useEffect } from 'react'
import { useWalletContext } from '../context/wallet';
import useTotalMinted from './useTotalMinted'

const useMintedStatus = (metadataUri) => {
    const [isMinted, setisMinted] = useState(false);

    const { totalMinted } = useTotalMinted()
    const { account, contract } = useWalletContext()

  useEffect(() => {
    const getMintedStatus = async () => {
      let result
      try {
        result = await contract.isContentOwned(metadataUri);
        setisMinted(result)
      } catch (e) {
        setisMinted(false)
      }
    }

    getMintedStatus();
  }, [contract, totalMinted, metadataUri, account]);

  return { isMinted }
}

export default useMintedStatus