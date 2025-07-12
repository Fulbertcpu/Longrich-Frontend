
// src/components/Navbar/MobileDrawer.jsx
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Button
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

function MobileDrawer({ isDrawerOpen, onDrawerClose }) {
  const {isAuthenticated,utilisateur,role} = useAuth()

  return (
    <Drawer placement="right" onClose={onDrawerClose} isOpen={isDrawerOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
         {isAuthenticated && utilisateur ?(
         <DrawerHeader backgroundColor={'black'} color={"white"}>{utilisateur.prenom_utilisateur} {utilisateur.nom_utilisateur}</DrawerHeader>
            ):(
          <DrawerHeader>Mon Profil</DrawerHeader>
            )} 
        <DrawerBody>
          <VStack spacing={4} align="start">
            {/* <Button as={RouterLink} to="/services" variant="ghost"  onClick={onDrawerClose}>Services</Button> */}
            {/* <Button as={RouterLink} to="/modifier" variant="ghost"  onClick={onDrawerClose}>Modifier</Button> */}
            <Button as={RouterLink} to="/commandes" variant="ghost"  onClick={onDrawerClose}>Mes Commandes</Button>
            {isAuthenticated && (role === "distributeur" || role === "Admin") && (
            <Button as={RouterLink} to="/distributeur" variant="ghost"  onClick={onDrawerClose}>Distributeur</Button>
            )} 
            {isAuthenticated && role === "Admin"&& (
            <Button as={RouterLink} to="/AdminDashboard" variant="ghost"  onClick={onDrawerClose}>Administrateur</Button>
            )} 
            
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileDrawer;