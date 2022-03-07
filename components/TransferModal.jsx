import {
    Button,
    Modal,
    ModalOverlay,
    ModalFooter,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure
  } from "@chakra-ui/react";

import { useCallback, useEffect } from "react";
import { useWalletContext } from "../context/wallet";

const TransferModal = (nft, to) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { contract } = useWalletContext()

    console.log(contract);

    // const listener = useCallback((from, to, value) => {
    //   onOpen()
    //   console.log(from);
    //   console.log(to);
    //   console.log(parseInt(value, 10));
    // }, [onOpen])
  
    // useEffect(() => {
    //   contract.on("Transfer", listener)
  
    //   return () => {
    //     contract.off("Transfer", listener)
    //   }
    // }, [listener, contract])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                hello
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
  }

export default TransferModal