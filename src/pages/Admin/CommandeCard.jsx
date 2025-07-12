// src/components/CommandeCard.jsx
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Heading,
  IconButton,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";

const CommandeCard = ({ commande, onDelete, onEdit }) => {
  const {
    id_commande,
    prix_total_commande,
    date_commande,
    date_livre,
    status_commande,
    adresse_livre_commande,
    client,
    distributeur,
    produits,
  } = commande;

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} bg="white" mb={4} shadow="sm">
      <HStack justify="space-between" mb={2}>
        <Heading size="sm">Commande #{id_commande}</Heading>
        <HStack spacing={2}>
          <IconButton
            icon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
            size="sm"
            onClick={onToggle}
            aria-label="Détails"
          />
          <IconButton
            icon={<FaEdit />}
            size="sm"
            colorScheme="blue"
            onClick={() => onEdit(commande)}
            aria-label="Modifier"
          />
          <IconButton
            icon={<FaTrash />}
            size="sm"
            colorScheme="red"
            onClick={() => onDelete(id_commande)}
            aria-label="Supprimer"
          />
        </HStack>
      </HStack>

      <Text>💰 Total: {prix_total_commande} FCFA</Text>
      <Text>📦 Status: <Badge colorScheme="green">{status_commande}</Badge></Text>

      <Collapse in={isOpen} animateOpacity>
        <VStack align="start" mt={4} spacing={2}>
          <Text>📅 Commandée le: {new Date(date_commande).toLocaleDateString()}</Text>
          <Text>🚚 Livraison prévue: {new Date(date_livre).toLocaleDateString()}</Text>
          <Text>📍 Adresse de livraison: {adresse_livre_commande}</Text>

          <Divider />
          <Text fontWeight="bold">👤 Client</Text>
          <Text>Nom: {client.prenom}</Text>
          <Text>Contact: {client.contact}</Text>

          <Divider />
          <Text fontWeight="bold">🧑‍💼 Distributeur</Text>
          <Text>Nom: {distributeur.prenom}</Text>
          <Text>Contact: {distributeur.contact}</Text>

          <Divider />
          <Text fontWeight="bold">🛒 Produits commandés :</Text>
          {produits.map((prod) => (
            <Box key={prod.id_produit} ml={4}>
              <Text>- {prod.libelle_produit}</Text>
              <Text fontSize="sm">
                {prod.qte} x {prod.prix_unitaire} FCFA
              </Text>
            </Box>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
};

export default CommandeCard;
