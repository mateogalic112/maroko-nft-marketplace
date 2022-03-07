import { useEffect, useState } from "react";
import { useWalletContext } from "../context/wallet";

const useTotalMinted = () => {
  const [totalMinted, setTotalMinted] = useState(0);

  const { contract } = useWalletContext()

  useEffect(() => {
    const getTotalMinted = async () => {
      let count
      try {
        count = await contract.count()
        setTotalMinted(parseInt(count));
      } catch (e) {
        setTotalMinted(0)
      }
    };

    getTotalMinted()
  }, [contract]);

  return { totalMinted }
};

export default useTotalMinted;
