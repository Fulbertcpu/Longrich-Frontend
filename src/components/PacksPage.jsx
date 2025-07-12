import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Stack,
  useDisclosure,
  Collapse,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { fetchWithToken } from "../utils/fetchWithToken";
import CommandModal from "./CommandModal";
import { useSearch } from "../hooks/SearchContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js"
const host = import.meta.env.VITE_API_URL;

function PacksPage() {
  const [packs, setPacks] = useState([]);
  const [selectedPack, setSelectedPack] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
const navigate = useNavigate()
const {isAuthenticated} = useAuth()

const toast = useToast()

  const {
    isOpen: isDescOpen,
    onOpen: openDescModal,
    onClose: closeDescModal,
  } = useDisclosure();

  const {
    isOpen: isCmdOpen,
    onOpen: openCmdModal,
    onClose: closeCmdModal,
  } = useDisclosure();

  const user = JSON.parse(localStorage.getItem("utilisateur"));
  const { searchValue } = useSearch();

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const res = await fetchWithToken(`${host}/packs/all`);
        const data = await res.json();
        setPacks(data);
      } catch (err) {
      }
    };
    fetchPacks();
  }, []);

  const handleOpenDescription = (pack) => {
    setSelectedPack(pack);
    setShowDescription(false); 
    openDescModal();
  };
  
  const handleOpenCommande = (pack) => {
    setSelectedPack(pack);
    openCmdModal();
  };
  
  const handleCommandeConfirmed = () => {
    //  toast({
    //   title: "Commande passée avec succès",
    //   status: "success",
    //   duration: 3000,
    //   isClosable: true
    // });
    closeCmdModal();
    closeDescModal();
  };
 

  const filteredPacks = packs.filter(pack =>
    pack.libelle_pack.toLowerCase().includes(searchValue.toLowerCase()) ||
    pack.description_pack.toLowerCase().includes(searchValue.toLowerCase())
  );


   const components = {
       h2: ({node, ...props}) => <Heading as="h2" size="md" color="green" {...props} />,
       p: ({node, ...props}) => <Text fontSize="md" {...props} />
       };


  return (
    <Box p={[2, 4, 6]}>
      <Heading mb={6} size="lg" textAlign="center">💊 Nos Packs de Traitement</Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {filteredPacks.map(pack => (
          <Box
            key={pack.id_pack}
            borderWidth="1px"
            rounded="lg"
            p={4}
            boxShadow="md"
            textAlign="center"
          >
            <Image
              src={pack.produits[0]?.image_url}
              alt={pack.libelle_pack}
              objectFit="cover"         
              width="100%"             
              height="auto"
              minH={"50px"}          
              maxH={["160px", "180px", "200px"]}  
              borderRadius="lg"
              onClick={() => handleOpenDescription(pack)}
              cursor="pointer"
            />
            <Text fontWeight="bold" fontSize="lg">{pack.libelle_pack}</Text>
            <Text color="teal.600" fontWeight="semibold" mt={1}>
              {Number(pack.prix_total_pack).toLocaleString()} FCFA
            </Text>

            <Stack mt={4}>
              <Button
                size="sm"
                colorScheme="teal"
                onClick={() =>{
                  if(isAuthenticated){
                     handleOpenCommande(pack) 
                    }else
                    {
                      toast({
                          title: "Erreur",
                          description:"Veillez vous connecter",
                          status: "error",
                          duration: 3000,
                          isClosable: true
                        });
                      navigate("/SignUpModal")
                    }
                }
                }
              >
                Acheter ce pack
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>

      {/* ✅ Modale Description avec déroulement */}
      {selectedPack && isDescOpen && (
        <Modal isOpen={isDescOpen} onClose={closeDescModal} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedPack.libelle_pack}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={4}>
              {/* Icône pour dérouler ou cacher la description */}
              <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                <Text fontWeight="semibold">Description du pack</Text>
                <IconButton
                  icon={showDescription ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  size="sm"
                  onClick={() => setShowDescription(!showDescription)}
                  aria-label="Voir ou cacher la description"
                />
              </Box>

              <Collapse in={showDescription}>
                <Box mt={2} p={2}
                  bg="gray.50" 
                  borderRadius="md" 
                  fontSize="sm"
                   >
                   <ReactMarkdown components={components}>
                      {selectedPack.description_pack}
                   </ReactMarkdown>
                </Box>
              </Collapse>

              <Text fontWeight="semibold" mt={4} mb={2}>Contenu du pack :</Text>
              <Stack spacing={3}>
                {selectedPack.produits.map(prod => (
                  <Box key={prod.id_produit} display="flex" gap={3} alignItems="center">
                    <Image
                      src={prod.image_url}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Box>
                      <Text fontWeight="semibold">{prod.libelle_produit}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {prod.qte} x {prod.prix_unitaire_produit.toLocaleString()} FCFA
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Button
                colorScheme="teal"
                w="full"
                mt={6}
                onClick={() => {
                  if(isAuthenticated){
                     closeDescModal();
                     openCmdModal();
                    }else
                    {
                      toast({
                          title: "Erreur",
                          description:"Veillez vous connecter",
                          status: "error",
                          duration: 3000,
                          isClosable: true
                        });
                      navigate("/SignUpModal")
                    }
                }}
              >
                Acheter ce pack
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* ✅ Modale Commande */}
      {selectedPack && isCmdOpen && (
        <CommandModal
          isOpen={isCmdOpen}
          onClose={closeCmdModal}
          user={user}
          type_commande="pack"
          id_source={selectedPack.id_pack}
          onCommandeConfirmed={handleCommandeConfirmed}
        />
      )}
    </Box>
  );
}

export default PacksPage;
