// components/cart/CartSummary.jsx
import { Button, Divider, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import CommandModal from "./CommandModal";

export default function CartSummary({ total, user, id_panier }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCommandeConfirmed = () => {
    setIsOpen(false);
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Divider />
      <Text fontWeight="bold" fontSize="xl">Total : {total} FCFA</Text>
      <Button colorScheme="green" onClick={() => setIsOpen(true)}>Passer la commande</Button>

      <CommandModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        user={user}
        type_commande="panier"
        id_source={id_panier}
        onCommandeConfirmed={handleCommandeConfirmed}
      />
    </VStack>
  );
}
