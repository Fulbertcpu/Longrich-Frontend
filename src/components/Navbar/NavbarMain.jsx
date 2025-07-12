
  // src/components/Navbar/NavbarMain.jsx
import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  IconButton,
  Avatar,
  useDisclosure
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

function NavbarMain({ searchValue, setSearchValue, onDrawerOpen, toggleSearch }) {
   
  const { isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const handleProtectedDrawerOpen = () => {
    if (isAuthenticated) {
      onDrawerOpen(); // ouvrir le Drawer si connecté
    } else {
      navigate("/SignUpModal"); // rediriger vers login sinon
    }
  };


  return (
    <Box bg="white"  px={4} boxShadow="sm" position="fixed" width={"100%"} top={0} zIndex={10}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box fontWeight="bolder" fontSize="lg" color={"green"}>LongrichShop</Box>

        <InputGroup
          maxW="400px"
          mx={4}
          flex={1}
          display={{ base: 'none', md: 'flex' }}
        >
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Rechercher..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputGroup>
         
         {isAuthenticated ?(
           <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          <Button as={RouterLink} to="SignUpModal" variant="ghost">S'inscrire</Button>
          <Button as={RouterLink} to="/panier" leftIcon={<FaShoppingCart />} variant="ghost">Panier</Button>
          <IconButton
            icon={<Avatar size="sm"  bgColor={"green"} />}
            variant="ghost"
            aria-label="Profil Utilisateur"
            onClick={handleProtectedDrawerOpen}
          />
        </HStack>
         ):(
         <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          <Button as={RouterLink} to="SignUpModal" variant="ghost">S'inscrire</Button>
          <IconButton
            icon={<Avatar size="sm"  bgColor={'brown'} />}
            variant="ghost"
            aria-label="Profil Utilisateur"
            onClick={handleProtectedDrawerOpen}
          />
        </HStack>
         )} 

       
        {isAuthenticated && (
            <HStack spacing={3} display={{ base: 'flex', md: 'none' }}>
              <IconButton icon={<SearchIcon />} variant="ghost" aria-label="Recherche" onClick={toggleSearch} />
              <IconButton icon={<FaShoppingCart />} variant="ghost" aria-label="Panier" as={RouterLink} to="/panier" />
              <IconButton icon={<Avatar size="xs" bgColor={'green'} />} variant="ghost" aria-label="Menu Utilisateur" onClick={handleProtectedDrawerOpen} />
            </HStack>
          )}

          {!isAuthenticated &&(
            <HStack spacing={0} display={{ base: 'flex', md: 'none' }}>
            <IconButton icon={<SearchIcon />} variant="ghost" aria-label="Recherche" onClick={toggleSearch} />
              <Button as={RouterLink} to="SignUpModal" variant="ghost">S'inscrire</Button>
              <IconButton icon={<Avatar size="xs"  bgColor={"brown"} />} variant="ghost" aria-label="Menu Utilisateur" onClick={handleProtectedDrawerOpen} />
            </HStack>
          )}
      </Flex>
    </Box>
  );
}

export default NavbarMain;