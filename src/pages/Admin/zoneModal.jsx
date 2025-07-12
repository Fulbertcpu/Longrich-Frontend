import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Textarea,
  Button,
  useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { fetchWithToken } from "../../utils/fetchWithToken";
 const host = import.meta.env.VITE_API_URL;
  
const ZoneModal = ({ isOpen, onClose, fetchZones, editData }) => {
  const [nomZone, setNomZone] = useState("");
  const [descriptionZone, setDescriptionZone] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (editData) {
      setNomZone(editData.nom_zone);
      setDescriptionZone(editData.zone_description);
    } else {
      setNomZone("");
      setDescriptionZone("");
    }
  }, [editData]);

  const handleSubmit = async () => {
    if (!nomZone.trim() || !descriptionZone.trim()) return;

    const url = editData
      ? `${host}/zones/updateZone`
      : `${host}/zones/addZone`;

    const method = editData ? "PUT" : "POST";

    try {
      const res = await fetchWithToken(url, {
        method,
        body: JSON.stringify({
          id_zone: editData?.id_zone,
          nom_zone: nomZone,
          zone_description: descriptionZone,
        }),
      });

      if (!res.ok) throw new Error();

      toast({
        title: editData ? "Zone modifiée" : "Zone ajoutée",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      onClose();
      fetchZones();
    } catch {
      toast({
        title: "Erreur",
        description: "Échec de l'opération.",
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
        <ModalHeader>{editData ? "Modifier la zone" : "Ajouter une zone"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Nom de la zone"
            value={nomZone}
            onChange={(e) => setNomZone(e.target.value)}
            mb={3}
          />
          <Textarea
            placeholder="Description"
            value={descriptionZone}
            onChange={(e) => setDescriptionZone(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {editData ? "Modifier" : "Ajouter"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ZoneModal;
