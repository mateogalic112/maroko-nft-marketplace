import { useState, useEffect, useCallback } from 'react'

const useMintedStatus = (contract, metadataUri, count) => {
    const [isMinted, setisMinted] = useState(false);

  const getMintedStatus = useCallback(async () => {
    let result
    try {
      result = await contract.isContentOwned(metadataUri);
      setisMinted(result)
    } catch (e) {
      setisMinted(false)
    }
  }, [contract, metadataUri]);

  useEffect(() => {
    if (contract && metadataUri) {
      getMintedStatus();
    }
  }, [contract, count, getMintedStatus, metadataUri]);

  return { isMinted }
}

export default useMintedStatus