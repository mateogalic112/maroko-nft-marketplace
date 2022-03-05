import { Text, Button, Flex, VStack } from "@chakra-ui/react";
import useContract from "../hooks/useContract";

export const Admin = () => {
  const { contractBalance, getContractBalance, collectMoney } = useContract()

  return (
    <Flex gap={4} alignItems="flex-end" justifyContent="flex-start" bg={"rgb(21, 38, 63, 0.5)"}>
      <VStack>
        <Text color="cyan.300" fontSize={28}>
          {contractBalance.toString()}
        </Text>
        <Button onClick={getContractBalance}>Balance</Button>
      </VStack>
      <VStack>
        <div style={{ height: "2rem" }} />
        <Button onClick={collectMoney}>Collect</Button>
      </VStack>
    </Flex>
  );
};

export default Admin;
