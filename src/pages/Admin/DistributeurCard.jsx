import {
  Box, Heading, Text, Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon, HStack, Button, useToast, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { fetchWithToken } from "../../utils/fetchWithToken";

function DistributeurCard({ distributeur, onRefresh }) {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedRemoveZone, setSelectedRemoveZone] = useState("");
  const toast = useToast();
  const { isOpen: isOpenAttrib, onOpen: onOpenAttrib, onClose: onCloseAttrib } = useDisclosure();
  const { isOpen: isOpenRemove, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure();
const host = import.meta.env.VITE_API_URL;
 
  const fetchZones = async () => {
    try {
      const res = await fetchWithToken(`${host}/zones/allZones`);
      const data = await res.json();
      setZones(data);
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de charger les zones",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleAttribZone = async () => {
    try {
      const res = await fetchWithToken(`${host}/distributors/atribZone`, {
        method: "PUT",
        body: JSON.stringify({
          id_zone: parseInt(selectedZone),
          id_distributeur: distributeur.id_distributeur,
        }),
      });

      if (!res.ok) throw new Error();

      toast({
        title: "Succès",
        description: "Zone attribuée avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onCloseAttrib();
      onRefresh();
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible d'attribuer la zone",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleRemoveZone = async () => {
    try {
      const res = await fetchWithToken(`${host}/distributors/removeDisZone`, {
        method: "DELETE",
        body: JSON.stringify({
          id_zone: parseInt(selectedRemoveZone),
          id_distributeur: distributeur.id_distributeur,
        }),
      });

      if (!res.ok) throw new Error();

      toast({
        title: "Succès",
        description: "Zone retirée avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onCloseRemove();
      onRefresh();
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de retirer la zone",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
      <Heading fontSize="xl">
        {distributeur.prenom_utilisateur} {distributeur.nom_utilisateur}
      </Heading>
      <Text>Pays: {distributeur.nom_pays}</Text>
      <Text>Email: {distributeur.email}</Text>
      <Text>Contact: {distributeur.contact}</Text>

      <Accordion allowToggle mt={3}>
        {distributeur.zones.map((zone, i) => (
          <AccordionItem key={i}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {zone.nom_zone}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>{zone.zone_description}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <HStack mt={4} spacing={4}>
        <Button colorScheme="green" size="sm" onClick={() => { onOpenAttrib(); fetchZones(); }}>
          ➕ Attribuer zone
        </Button>
        <Button colorScheme="red" size="sm" onClick={() => onOpenRemove()}>
          ➖ Retirer zone
        </Button>
      </HStack>

      {/* Modal Attribuer */}
      <Modal isOpen={isOpenAttrib} onClose={onCloseAttrib}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Attribuer une zone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAttribZone}>Attribuer</Button>
            <Button onClick={onCloseAttrib}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Retirer */}
      <Modal isOpen={isOpenRemove} onClose={onCloseRemove}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Retirer une zone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Sélectionner une zone"
              value={selectedRemoveZone}
              onChange={(e) => setSelectedRemoveZone(e.target.value)}
            >
              {distributeur.zones.map((zone) => (
                <option key={zone.id_zone} value={zone.id_zone}>
                  {zone.nom_zone}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleRemoveZone}>Retirer</Button>
            <Button onClick={onCloseRemove}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default DistributeurCard;
