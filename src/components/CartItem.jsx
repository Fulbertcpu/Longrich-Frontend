import { HStack, IconButton, Image, Text, VStack, Box } from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";

export default function CartItems({ items, onUpdateQuantity }) {
  return (
    <>
      {items.map(item => (
        <Box key={item.id_produit} p={3} borderWidth="1px" borderRadius="lg" shadow="sm">
          <HStack spacing={3}>
            <Image src={item.image_url} boxSize="80px" objectFit="cover" />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">{item.libelle_produit}</Text>
              <Text>{item.prix_unitaire} X {item.qte} = {item.prix_unitaire * item.qte} FCFA</Text>
              <HStack>
                <IconButton
                  icon={<MinusIcon />}
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id_produit, item.qte - 1)}
                />
                <Text>{item.qte}</Text>
                <IconButton
                  icon={<AddIcon />}
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id_produit, item.qte + 1)}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => onUpdateQuantity(item.id_produit, 0)}
                />
              </HStack>
            </VStack>
          </HStack>
        </Box>
      ))}
    </>
  );
}
