// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'; // <-- Import ChakraProvider
import { SearchProvider } from './hooks/SearchContext';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider> {/* <-- Très important */}
        <SearchProvider>
        <App/>
      </SearchProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
