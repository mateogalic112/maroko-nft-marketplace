import {
    Button,
    Modal,
    ModalOverlay,
    ModalFooter,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
  } from "@chakra-ui/react";

const TransferModal = ({ nft, to, isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Mint</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                You {to} have minted {nft}!
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
  }

export default TransferModal