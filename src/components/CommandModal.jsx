import { useEffect, useState } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, Button, Text,
  Box, Collapse, IconButton, useToast
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { fetchWithToken } from "../utils/fetchWithToken";

const host = import.meta.env.VITE_API_URL;

export default function CommandModal({ isOpen, onClose, user, type_commande, id_source, onCommandeConfirmed }) {
  const [zones, setZones] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openDescIdx, setOpenDescIdx] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchDistributeurs = async () => {
      const res = await fetchWithToken(`${host}/distributors/allDistributors`);
      const data = await res.json();
      const sameCountryDistributors = data.filter(d => d.id_pays === user.id_pays);

      const allZones = [];
      sameCountryDistributors.forEach(dis => {
        dis.zones.forEach(zone => {
          allZones.push({
            nom_zone: zone.nom_zone,
            description: zone.zone_description,
            id_distributeur: dis.id_distributeur,
            id_zone: zone.id_zone
          });
        });
      });

      setZones(allZones);
    };

    if (isOpen) fetchDistributeurs();
  }, [isOpen, user.id_pays]);

  const handleConfirm = async () => {
    if (!selected) return;

    const body = {
      type_commande,
      id_source,
      id_utilisateur: user.id_utilisateur,
      id_distributeur: selected.id_distributeur,
      id_zone: selected.id_zone
    };

    try {
      await fetchWithToken(`${host}/commandes/addCmd`, {
        method: "POST",
        body: JSON.stringify(body)
      });

      toast({
        title: "Commande passée avec succès",
        status: "success",
        duration: 3000,
        isClosable: true
      });

      if (type_commande === "panier") {
        await fetchWithToken(`${host}/carts/vider/${id_source}`, {
           method: "DELETE" });
        setTimeout(() => window.location.reload(), 1200);
      }

      onCommandeConfirmed();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la commande :", error);
      toast({
        title: "Erreur lors de la commande",
        description: "Veuillez réessayer.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="90vh">
        <ModalHeader>Sélectionner une zone</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" maxH="70vh">
          <Text mb={4} color="red.600" fontWeight="bold">
            NB : Payer à la réception (excepté l'expédition)
          </Text>

          {zones.map((zone, idx) => (
            <Box
              key={idx}
              p={3}
              mb={3}
              border={selected === zone ? "2px solid blue" : "1px solid gray"}
              borderRadius="md"
              cursor="pointer"
              onClick={() => setSelected(zone)}
              bg={selected === zone ? "blue.50" : "white"}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Text fontWeight="semibold">{zone.nom_zone}</Text>
                <IconButton
                  icon={openDescIdx === idx ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDescIdx(openDescIdx === idx ? null : idx);
                  }}
                  aria-label="Afficher la description"
                />
              </Box>
              <Collapse in={openDescIdx === idx} animateOpacity>
                <Text mt={2} fontSize="sm" color="gray.700">{zone.description}</Text>
              </Collapse>
            </Box>
          ))}

          <Button
            mt={4}
            colorScheme="blue"
            w="full"
            onClick={handleConfirm}
            isDisabled={!selected}
          >
            Confirmer la commande
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}