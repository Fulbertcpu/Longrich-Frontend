import { useEffect, useState } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, Button,
  Text,
  useToast
} from "@chakra-ui/react";
import { fetchWithToken } from "../utils/fetchWithToken";

const host = import.meta.env.VITE_API_URL;

export default function CommandModal({ isOpen, onClose, user, type_commande, id_source, onCommandeConfirmed }) {
  const [zones, setZones] = useState([]);
  const [selected, setSelected] = useState(null);
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
          method: "DELETE"
        });

        // Attend que le toast s'affiche avant de recharger
        setTimeout(() => {
          window.location.reload();
        }, 1200); // Laisse le toast s'afficher
      }

      // Appelle la fonction parent pour notifier la commande
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sélectionner une zone</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text
            style={{
              padding: "10px",
              marginBottom: "5px",
              color: "red",
              fontWeight: "bolder"
            }}
          >
            NB: Payer à la réception
          </Text>
          {zones.map((zone, idx) => (
            <div
              key={idx}
              onClick={() => setSelected(zone)}
              style={{
                padding: "10px",
                marginBottom: "5px",
                border: selected === zone ? "2px solid blue" : "1px solid gray",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              <strong>{zone.nom_zone}</strong> – {zone.description}
            </div>
          ))}
          <Button mt={4} colorScheme="blue" onClick={handleConfirm} isDisabled={!selected}>
            Confirmer la commande
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
