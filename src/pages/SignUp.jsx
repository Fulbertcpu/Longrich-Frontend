import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button,
  Box,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/loginForm";

const SignUpModal = () => {
  const { isOpen:isOpen1, onOpen:onOpen1, onClose:onClose1 } = useDisclosure();
  const { isOpen:isOpen2, onOpen:onOpen2, onClose:onClose2 } = useDisclosure();


  return (
    <Box
      h="100vh"
      bgImage={`url(public/longrich3.jpg)`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      position="relative"
    >
      {/* Overlay sombre */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="rgba(0, 0, 0, 0.6)"
        zIndex={0}
      />

      {/* Contenu centré */}
      <VStack
        position="relative"
        zIndex={1}
        justify="center"
        align="center"
        h="100%"
        spacing={6}
        textAlign="center"
        px={4}
        color="white"
      >
        <Heading size="2xl">Bienvenue chez LongrichShop</Heading>
        <Text fontSize="lg" maxW="lg">
          Transformez votre vie grâce à nos produits de bien-être et nos
          opportunités exclusives. Rejoignez-nous dès aujourd’hui !
        </Text>

        <Button onClick={onOpen1} colorScheme="green" size="lg">
          S'inscrire
        </Button>

         <Button onClick={onOpen2} colorScheme="green" size="lg">
          Se Connecter
        </Button>
      </VStack>

      {/* Modal d’inscription */}
      <Modal isOpen={isOpen1} onClose={onClose1} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SignUpForm onClose ={onClose1} />
          </ModalBody>
        </ModalContent>
      </Modal>
        {/* Modal de connexion */}
        <Modal isOpen={isOpen2} onClose={onClose2} isCentered>
        <ModalOverlay/>
        <ModalContent>
            <ModalCloseButton/>
            <ModalBody pb={6}>
             <LoginForm onClose ={onClose2}/>
            </ModalBody>
        </ModalContent>
      </Modal>
    </Box>


  );
};

export default SignUpModal;
