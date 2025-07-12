

// src/components/Navbar/NavbarSecondary.jsx
import { Box, HStack, Button, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function NavbarSecondary({ onDrawerClose }) {

  
  return (
    <Box
      bg="gray.100"
      px={4}
      py={2}
      boxShadow="sm"
      position="sticky"
      top="64px"      
      zIndex={9}
      overflowX="auto"
      whiteSpace="nowrap"
    >
      <HStack spacing={6}>
        <Button as={RouterLink} to="/" fontWeight="medium" onClick={onDrawerClose} flexShrink={0}>Acceuil</Button>
        <Button as={RouterLink} to="/packs" fontWeight="medium" onClick={onDrawerClose} flexShrink={0}>Traitements</Button>
        {/* <Link as={RouterLink} to="/activites" fontWeight="medium" flexShrink={0}>Activités</Link> */}
        <Button as={RouterLink} to="/about" fontWeight="medium" flexShrink={0}  >À propos</Button>
        {/* <Link as={RouterLink} to="/communaute" fontWeight="medium" flexShrink={0}>Communauté</Link> */}
      </HStack>
    </Box>
  );
}

export default NavbarSecondary;