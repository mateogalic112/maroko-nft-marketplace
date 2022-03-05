import axios from "axios";
import { useState, useEffect } from "react";

const useMetadata = (metadataUri) => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const getMetadata = async () => {
      const response = await axios.get(metadataUri).then((res) => res.data);
      setMetadata(response);
    };

    getMetadata();
  }, [metadataUri]);

  return { metadata };
};

export default useMetadata;
