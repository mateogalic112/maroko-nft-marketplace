import { Button, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react"

function Balance() {
    const [balance, setBalance] = useState(0);

    const getBalance = async () => {
        const [account] = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accBalance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(accBalance))
    }

    return (
        <div>
            <Text fontSize="xl">Your Balance: {balance}</Text>

            <Button onClick={() => getBalance()}>Show My Balance</Button>
        </div>
      );
}

export default Balance