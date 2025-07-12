import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, Input, VStack, useToast, Select
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchWithToken } from "../../utils/fetchWithToken";

function AddDistributeurModal({ isOpen, onClose, onSuccess }) {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [contact, setContact] = useState("");
  const toast = useToast();
 const host = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (isOpen) {
      const fetchZones = async () => {
        try {
          const res = await fetchWithToken(`${host}/zones/allZones`);
          const data = await res.json();
          setZones(data);
        } catch (err) {
          toast({
            title: "Erreur",
            description: err.message ,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      };
      fetchZones();
    }
  }, [isOpen]);

  const handleAdd = async () => {
    if (!selectedZone || !contact) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await fetchWithToken(`${host}/distributors/add`, {
        method: "POST",
        headers:{},
        body: JSON.stringify({
          id_zone: parseInt(selectedZone),
          contact,
        }),
      });

      
      console.log("data", res.ok)
      if (!res.ok) throw new Error();

      toast({
        title: "Succès",
        description: "Distributeur ajouté avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSuccess();
      setContact("");
      setSelectedZone("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message ,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter un distributeur</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Select
              placeholder="Sélectionner une zone"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
            >
              {zones.map((zone) => (
                <option key={zone.id_zone} value={zone.id_zone}>
                  {zone.nom_zone}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Contact du distributeur"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAdd}>Ajouter</Button>
          <Button onClick={onClose}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddDistributeurModal;
