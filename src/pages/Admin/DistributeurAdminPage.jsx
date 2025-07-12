import {
  Box, Heading, Button, VStack, useToast, Spinner, useDisclosure, Flex,Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddDistributeurModal from "./AddDistributeurModal";
import DistributeurCard from "./DistributeurCard";
import { fetchWithToken } from "../../utils/fetchWithToken";

function DistributeurAdminPage() {
  const [distributeurs, setDistributeurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
const host = import.meta.env.VITE_API_URL;

  const fetchDistributeurs = async () => {
    setLoading(true);
    try {
      const response = await fetchWithToken(`${host}/distributors/allDistributors`);
      if (!response.ok) throw new Error("Échec du chargement");
      const data = await response.json();
      setDistributeurs(data);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les distributeurs",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchDistributeurs();
    onClose();
  };

  const handleCleanDistributeurs = async () => {
    try {
      const response = await fetchWithToken(`${host}/distributors/cleanDis`);

      if (!response.ok) throw new Error("Échec du nettoyage");
   
      toast({
        title: "Nettoyage effectué",
        description: "Les distributeurs sans zone ont été supprimés",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchDistributeurs();
    } catch (err) {
     
      toast({
        title: "Erreur",
        description: "Échec du nettoyage",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchDistributeurs();
  }, []);

  return (
    <Box p={8}>
      <Heading mb={6} textAlign="center">Gestion des Distributeurs</Heading>

     
      {/* Ligne des deux boutons */}
<Stack
  direction={{ base: "column", md: "row" }}
  spacing={4}
  mb={6}
  align="stretch"
>
  <Button
    colorScheme="blue"
    onClick={onOpen}
    whiteSpace="normal"
    textAlign="center"
  >
    ➕ Ajouter un distributeur
  </Button>

  <Button
    colorScheme="yellow"
    onClick={handleCleanDistributeurs}
    whiteSpace="normal"
    textAlign="center"
  >
    🧹 Nettoyer les distributeurs sans zone
  </Button>
</Stack>


      {loading ? (
        <Spinner />
      ) : (
        <VStack spacing={6} align="stretch">
          {distributeurs.map((dis) => (
            <DistributeurCard key={dis.id_distributeur} distributeur={dis} onRefresh={fetchDistributeurs} />
          ))}
        </VStack>
      )}

      <AddDistributeurModal isOpen={isOpen} onClose={onClose} onSuccess={handleSuccess} />
    </Box>
  );
}

export default DistributeurAdminPage;
