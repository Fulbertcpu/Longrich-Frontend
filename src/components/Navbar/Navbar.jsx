
// src/components/Navbar/Navbar.jsx
import { Box, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import NavbarMain from './NavbarMain';
import MobileSearchBar from './MobileSearchBar';
import MobileDrawer from './MobileDrawer';
import NavbarSecondary from './NavbarSecondary';
import { useSearch } from '../../hooks/SearchContext';
function Navbar() {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isSearchOpen,
    onToggle: toggleSearch,
  } = useDisclosure();

const { searchValue, setSearchValue } = useSearch();

  return (
    <Box>
      <NavbarMain
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onDrawerOpen={onDrawerOpen}
        toggleSearch={toggleSearch}
      />
      
      <Box mt={"64px"}>
      <MobileSearchBar
        isSearchOpen={isSearchOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <MobileDrawer
        isDrawerOpen={isDrawerOpen}
        onDrawerClose={onDrawerClose}
      />
      <NavbarSecondary onDrawerClose={onDrawerClose} />
      </Box>
      
    </Box>
  );
}

export default Navbar;
