// src/components/Navbar/MobileSearchBar.jsx
import { Box, Collapse, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function MobileSearchBar({ isSearchOpen, searchValue, setSearchValue }) {

  return (
    <Collapse in={isSearchOpen} animateOpacity>
      <Box px={4} >
        <InputGroup>
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
      </Box>
    </Collapse>
  );
}

export default MobileSearchBar;