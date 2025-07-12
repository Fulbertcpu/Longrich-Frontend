import {
  Box,
  Image,
  Text,
  IconButton,
  useDisclosure,
  VStack,
  Collapse,
  Button,
  HStack,
  useToast
} from "@chakra-ui/react";
import { AddIcon, InfoIcon } from "@chakra-ui/icons";
import ProductModal from "./ProductModal";
import { addToCart } from "../utils/addToCart";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
   const navigate = useNavigate()
  return (
   <Box
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      p={2}
      bg="white"
      shadow="md"
      _hover={{ shadow: "lg" }}
      w="100%"
      
    >
      <Image
       src={product.images[0].image_url}
       alt={product.libelle_produit}
       objectFit="cover"         
       width="100%"             
       height="auto"
       minH={"50px"}          
       maxH={["160px", "180px", "200px"]}  
       borderRadius="lg"
       cursor="pointer"
       onClick={onOpen}
      />
      <VStack spacing={1} mt={2} align="stretch">
        <Text fontWeight="bold" fontSize="lg" noOfLines={1}>{product.libelle_produit}</Text>
        <Text color="green.600">{product.prix_unitaire} FCFA</Text>
        <IconButton
          icon={<AddIcon />}
          aria-label="Ajouter au panier"
          colorScheme="green"
          size="sm"
          onClick={async()=>{
            try {
              await addToCart(product.id_produit)
               
               toast({
                 title: "Produit ajouté au panier avec succès",
                 status: "success",
                 duration: 3000,
                 isClosable: true
               });
            } catch (error) {
              toast({
                   title: "Erreur",
                   description: error.message || "Échec de l'ajout",
                   status: "error",
                   duration: 3000,
                   isClosable: true
                 });
              navigate("SignUpModal")
            }
          }}
        />
      </VStack>

      <ProductModal isOpen={isOpen} onClose={onClose} product={product} />
    </Box>
  );
}

export default ProductCard;
