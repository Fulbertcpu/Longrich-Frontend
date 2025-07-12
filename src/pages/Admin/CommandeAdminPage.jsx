import { useEffect, useState } from "react";
import { Box, Heading, Spinner, useToast, useDisclosure } from "@chakra-ui/react";
import EditCommandeModal from "./EditCmdModal";
import CommandeCard from "./CommandeCard";
import { fetchWithToken } from "../../utils/fetchWithToken";

const CommandeAdminPage = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCommande, setSelectedCommande] = useState(null);
  const host = import.meta.env.VITE_API_URL;
  
  // ✅ Déplacée ici
  const fetchCommandes = async () => {
    try {
      const res = await fetchWithToken(`${host}/commandes/allCommandes`, {
        headers: {},
      });
      const data = await res.json();
      setCommandes(data);
    } catch (error) {
      console.error("Erreur lors du chargement des commandes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, [token]);

  const handleDelete = async (id_commande) => {
    if (!window.confirm("Confirmer la suppression de cette commande ?")) return;

    try {
      const res = await fetchWithToken(`${host}/commandes/${id_commande}`, {
        method: "DELETE",
        headers: {},
      });
      if (res.ok) {
        setCommandes((prev) => prev.filter((c) => c.id_commande !== id_commande));
        toast({
          title: "Commande supprimée.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Erreur lors de la suppression");
      }
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la commande.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (commande) => {
    setSelectedCommande(commande);
    onOpen();
  };

  if (loading) return <Spinner />;

  return (
    <Box p={6}>
      <Heading mb={4}>Liste des Commandes</Heading>
      {commandes.map((cmd) => (
        <CommandeCard
          key={cmd.id_commande}
          commande={cmd}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
      <EditCommandeModal
        isOpen={isOpen}
        onClose={onClose}
        commande={selectedCommande}
        onSuccess={fetchCommandes}
      />
    </Box>
  );
};

export default CommandeAdminPage;
