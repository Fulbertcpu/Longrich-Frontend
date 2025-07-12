import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchWithToken } from "../utils/fetchWithToken";
const host = import.meta.env.VITE_API_URL;
import { useSearch } from "../hooks/SearchContext";

function HomePage() {
  const [products, setProducts] = useState([]);
  const { searchValue } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchWithToken(`${host}/products/allProducts`);
      const data = await res.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((prod) =>
    prod.libelle_produit.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Box p={[2, 4, 6]}>
      <Heading mb={6} size="lg" textAlign="center">
        🛍️ Nos Produits
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {filteredProducts.map((prod) => (
          <ProductCard key={prod.id_produit} product={prod} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default HomePage;
