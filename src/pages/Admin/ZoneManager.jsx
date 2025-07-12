import {
  Box, Heading, Button, List, ListItem, HStack, IconButton, useToast
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { fetchWithToken } from "../../utils/fetchWithToken";
import ZoneModal from "./zoneModal";

function ZoneManager() {
  const [zones, setZones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const toast = useToast();
 const host = import.meta.env.VITE_API_URL;

  const fetchZones = async () => {
    try {
      const res = await fetchWithToken(`${host}/zones/allZones`);
      const data = await res.json();
      setZones(data);
    } catch {
      toast({
        title: "Erreur",
        description: "Échec du chargement des zones.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const handleDelete = async (id_zone) => {
    try {
      const res = await fetchWithToken(`${host}/distributeurs/removeZone/${id_zone}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast({
        title: "Zone supprimée",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      fetchZones();
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la zone",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (zone) => {
    setEditData(zone);
    setIsModalOpen(true);
  };

  return (
    <Box p={4}>
      <Heading fontSize="xl" mb={4}>Gestion des zones</Heading>

      <Button
        colorScheme="green"
        onClick={() => {
          setEditData(null);
          setIsModalOpen(true);
        }}
        mb={4}
      >
        Ajouter une zone
      </Button>

      <List spacing={3}>
        {zones.map((zone) => (
          <ListItem key={zone.id_zone}>
            <HStack justify="space-between">
              <Box>
                <strong>{zone.nom_zone}</strong> - {zone.zone_description}
              </Box>
              <HStack>
                <IconButton
                  icon={<EditIcon />}
                  aria-label="Modifier"
                  colorScheme="yellow"
                  onClick={() => handleEdit(zone)}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Supprimer"
                  colorScheme="red"
                  onClick={() => handleDelete(zone.id_zone)}
                />
              </HStack>
            </HStack>
          </ListItem>
        ))}
      </List>

      <ZoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchZones={fetchZones}
        editData={editData}
      />
    </Box>
  );

}

export default ZoneManager;


