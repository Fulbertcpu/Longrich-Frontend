import {
  Box,
  Text,
  IconButton,
  VStack,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";

const ProductCard = ({ product, onEdit, onDelete, onView }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      boxShadow="sm"
      width="100%"
      mb={4}
      bg="white"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={4}
      >
        {/* Infos produit */}
        <VStack align="start" spacing={1}>
          <Text> N°{product.id_produit}</Text>
          <Text fontWeight="bold" fontSize="lg">
            {product.libelle_produit}
          </Text>
          <Text color="green.500" fontWeight="medium">
            {product.prix_unitaire} FCFA
          </Text>
        </VStack>

        {/* Actions */}
        <Stack
          direction="row"
          spacing={2}
          wrap="wrap"
          justify={{ base: "flex-start", md: "flex-end" }}
        >
          <IconButton
            size="sm"
            colorScheme="blue"
            icon={<FaEdit />}
            aria-label="Modifier"
            onClick={() => onEdit(product)}
          />
          <IconButton
            size="sm"
            colorScheme="red"
            icon={<FaTrash />}
            aria-label="Supprimer"
            onClick={() => onDelete(product.id_produit)}
          />
          <IconButton
            size="sm"
            variant="outline"
            icon={<FaInfoCircle />}
            aria-label="Détails"
            onClick={() => onView(product)}
          />
        </Stack>
      </Flex>
    </Box>
  );
};

export default ProductCard;
