// components/cart/CartPage.jsx
import { Box, Text, VStack } from "@chakra-ui/react";
import CartItems from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const { cartItems, updateQuantity, total,id_panier } = useCart();
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"))
  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Mon panier</Text>
      {cartItems.length === 0 ? (
        <Text>Votre panier est vide.</Text>
      ) : (
        <VStack align="stretch" spacing={4}>
          <CartItems items={cartItems} onUpdateQuantity={updateQuantity} />
          <CartSummary total={total} user={utilisateur} id_panier={id_panier} />
        </VStack>
      )}
    </Box>
  );
}
