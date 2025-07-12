import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter
} from "@chakra-ui/react";
import EditProductForm from "./EditProductForm";

const ProductEditModal = ({ isOpen, onClose, product, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modifier le produit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditProductForm product={product} onSubmit={onSubmit} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductEditModal;
