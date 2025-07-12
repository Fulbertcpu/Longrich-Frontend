import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, Text
} from "@chakra-ui/react";

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product.libell_produit}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text color="gray.600">{product.description_produit}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductDetailsModal;
