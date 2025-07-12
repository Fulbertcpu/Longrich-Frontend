import {
  Box,
  Heading,
  Text,
  Stack,
  Collapse,
  Button,
  Flex,
  Spacer,
  Badge,
  VStack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { IconButton, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchWithToken } from "../utils/fetchWithToken";

const host = import.meta.env.VITE_API_URL;

export default function DistributorOrdersPage() {
  const user = JSON.parse(localStorage.getItem("utilisateur"));
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});

  const toast = useToast();

  const updateCommandeStatus = async (id_commande) => {
    try {
      const res = await fetchWithToken(`${host}/commandes/upDateCommande`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status_commande: "Livrée", id_commande }),
      });

      if (!res.ok) throw new Error("Échec de mise à jour");

      toast({
        title: "Commande mise à jour.",
        description: "Statut changé en 'Livrée'.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Recharge les commandes après mise à jour
      const updated = await fetchWithToken(`${host}/commandes/disCommandes`);
      const data = await updated.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data.commandes)) {
        setOrders(data.commandes);
      } else {
        console.warn("Format inattendu lors du rechargement :", data);
        setOrders([]);
      }
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la commande.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetchWithToken(`${host}/commandes/disCommandes`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setOrders(data);
        } else if (Array.isArray(data.commandes)) {
          setOrders(data.commandes);
        } else {
          console.warn("Format inattendu des commandes :", data);
          setOrders([]);
        }
      } catch (err) {
        console.error("Erreur chargement commandes :", err);
      }
    };

    if (user?.id_utilisateur) {
      fetchOrders();
    }
  }, [user?.id_utilisateur]);

  const toggleExpand = (id_commande) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [id_commande]: !prev[id_commande],
    }));
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  const commandesLivrees = Array.isArray(orders)
    ? orders.filter((c) => c.status_commande === "Livrée")
    : [];
  const commandesNonLivrees = Array.isArray(orders)
    ? orders.filter((c) => c.status_commande !== "Livrée")
    : [];

  const renderCommande = (commande) => (
    <Box
      key={commande.id_commande}
      borderWidth="1px"
      borderRadius="md"
      p={4}
      boxShadow="sm"
    >
      <Flex align="center" mb={2}>
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Commande #{commande.id_commande}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Commandée le: {formatDate(commande.date_commande)} - Livraison
            prévue: {formatDate(commande.date_livre)}
          </Text>
        </Box>
        <Spacer />
        <Flex align="center" gap={2}>
          <Badge
            colorScheme={
              commande.status_commande === "Livrée"
                ? "green"
                : commande.status_commande === "Annulée"
                ? "red"
                : "yellow"
            }
            textTransform="capitalize"
          >
            {commande.status_commande}
          </Badge>
          {commande.status_commande !== "Livrée" && (
            <IconButton
              icon={<EditIcon />}
              size="sm"
              colorScheme="blue"
              aria-label="Marquer comme livrée"
              title="Marquer comme livrée"
              onClick={() => updateCommandeStatus(commande.id_commande)}
            />
          )}
        </Flex>
      </Flex>

      <Text mb={1}>
        Client : <strong>{commande.client?.prenom || "Inconnu"}</strong> -{" "}
        {commande.client?.contact || "N/A"}
      </Text>
      <Text mb={1}>Adresse : {commande.adresse_livre_commande}</Text>
      <Text fontWeight="semibold" mb={2}>
        Prix total :{" "}
        {Number(commande.prix_total_commande).toLocaleString()} FCFA
      </Text>

      <Button
        size="sm"
        onClick={() => toggleExpand(commande.id_commande)}
        mb={2}
      >
        {expandedOrders[commande.id_commande]
          ? "Cacher les produits -"
          : "Voir les produits +"}
      </Button>

      <Collapse in={expandedOrders[commande.id_commande]} unmountOnExit>
        <VStack spacing={3} align="stretch" borderTop="1px solid #eee" pt={3}>
          {commande.produits?.map((prod) => (
            <Box
              key={prod.id_produit}
              p={2}
              borderWidth="1px"
              borderRadius="md"
            >
              <Text fontWeight="bold">{prod.libelle_produit}</Text>
              <Text fontSize="sm" color="gray.700">
                {prod.description_produit}
              </Text>
              <Text fontSize="sm">
                Quantité: {prod.qte} x{" "}
                {prod.prix_unitaire.toLocaleString()} FCFA
              </Text>
              <Text fontWeight="semibold" mt={1}>
                Total:{" "}
                {(prod.qte * prod.prix_unitaire).toLocaleString()} FCFA
              </Text>
            </Box>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );

  return (
    <Box p={[3, 6]} maxW="900px" mx="auto">
      <Heading mb={6} textAlign="center">
        📬 Commandes à gérer
      </Heading>

      <Box mb={8}>
        <Heading as="h2" size="md" mb={4}>
          📦 Commandes en cours
        </Heading>
        {commandesNonLivrees.length === 0 ? (
          <Text color="gray.500">Aucune commande en cours.</Text>
        ) : (
          <Stack spacing={5}>
            {commandesNonLivrees.map(renderCommande)}
          </Stack>
        )}
      </Box>

      <Box>
        <Heading as="h2" size="md" mb={4}>
          ✅ Commandes livrées
        </Heading>
        {commandesLivrees.length === 0 ? (
          <Text color="gray.500">Aucune commande livrée.</Text>
        ) : (
          <Stack spacing={5}>{commandesLivrees.map(renderCommande)}</Stack>
        )}
      </Box>
    </Box>
  );
}
