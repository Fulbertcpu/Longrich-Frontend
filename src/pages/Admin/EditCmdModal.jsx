import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, Select, useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchWithToken } from "../../utils/fetchWithToken";

const statusOptions = ["Comfirmé", "Livrée", "Annulée"];

function EditCommandeModal({ isOpen, onClose, commande, onSuccess }) {
  const [status, setStatus] = useState("");
  const toast = useToast();
 const host = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (commande) {
      setStatus(commande.status_commande);
    }
  }, [commande]);

  const handleSave = async () => {
    try {
      const res = await fetchWithToken(
        `${host}/commandes/upDateCommande`,
        {
          method: "PUT",
          body: JSON.stringify({ status_commande: status,id_commande:commande.id_commande}),
        }
      );

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      toast({
        title: "Succès",
        description: "Statut mis à jour",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSuccess();
      onClose();
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Mise à jour échouée",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modifier le statut</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Sauvegarder
          </Button>
          <Button onClick={onClose}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditCommandeModal;
