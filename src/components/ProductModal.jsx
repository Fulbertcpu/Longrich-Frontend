import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody,
   ModalFooter,
   Text, Button,
    Image, Box, 
    HStack, Collapse,
    IconButton,Heading,
    useToast,
    UnorderedList,
    ListItem
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import {useNavigate} from "react-router-dom"
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { addToCart } from "../utils/addToCart.js";

function ProductModal({ isOpen, onClose, product }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const toast = useToast()
  const navigate = useNavigate()
  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };


  const components = {
    h1: (props) => <Heading as="h1" size="lg" color="teal.600" mt={6} mb={4} {...props} />,
    h2: (props) => <Heading as="h2" size="lg" color="teal.600" mt={6} mb={4} {...props} />,
    h3: (props) => <Heading as="h3" size="md" color="teal.500" mt={4} mb={2} {...props} />,
    h4: (props) => <Heading as="h4" size="sm" color="teal.600" mt={3} mb={2} {...props} />,
    p: ({ children, ...props }) => {
      const isWarning = typeof children === 'string' && children.includes('Précaution');
      return (
        <Box
          bg={isWarning ? 'red.200' : 'transparent'}
          borderLeft={isWarning ? '4px solid red' : 'none'}
          p={isWarning ? 3 : 0}
          my={isWarning ? 4 : 0}
        >
          <Text fontSize="md" color={isWarning ? 'red.800' : 'inherit'} {...props}>
            {children}
          </Text>
        </Box>
      );
    },
    ul: ({children, ...props}) =>(
      <List pl={5} mb={3} {...props}>
        {children}
      </List>
    ),
      
    li: ({children, ...props}) =>(
      <ListItem mb={2} {...props}>
        {children}
      </ListItem>

    ),
    strong: (props) => <Text as="strong" fontWeight="bold" color="red.600" {...props} />,
    blockquote: (props) => <Box bg="gray.50" p={4} borderLeft="4px solid teal" my={4} {...props} />
  };

 
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product.libelle_produit}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src={product.images[currentImage].image_url}
            alt="Image produit"
            objectFit="cover"         
            width="100%"             
            height="auto"            
            borderRadius="lg"
            cursor="pointer"
          />

          {product.images.length > 1 && (
            <HStack justify="center" mb={4}>
              <Button onClick={handlePrev}>⬅️</Button>
              <Button onClick={handleNext}>➡️</Button>
            </HStack>
          )}

          <Text>{product.libelle_produit}</Text>
          <Text><strong> {product.prix_unitaire}</strong> FCFA</Text>
          <Text><strong>Catégorie:</strong> {product.categorie}</Text>

          <Button
            mt={3}
            size="sm"
            variant="link"
            leftIcon={<InfoIcon />}
            onClick={() => setShowDescription(!showDescription)}
            colorScheme="teal"
          >
            {showDescription ? "Masquer" : "Voir"} description
          </Button>

          <Collapse in={showDescription} animateOpacity>
            <Box mt={2} p={2}
             bg="gray.50" 
             borderRadius="md" 
             fontSize="sm"
              >
              <ReactMarkdown components={components}>
                 {product.description_produit} 
              </ReactMarkdown>
            </Box>
          </Collapse>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" onClick={async()=>{
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
          }}>Ajouter au panier</Button>
          <Button ml={3} onClick={onClose}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProductModal;
