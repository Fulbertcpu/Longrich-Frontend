import { SimpleGrid, Box, Heading, Text, Spinner, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchWithToken } from "../utils/fetchWithToken";
import { useSearch } from "../hooks/SearchContext";

const host = import.meta.env.VITE_API_URL;

function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ état de chargement
  const { searchValue } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWithToken(`${host}/products/allProducts`);
        if (!res.ok) throw new Error("Erreur serveur");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Format inattendu");
        setProducts(data);
      } catch (err) {
        setError(err.message || "Erreur inconnue");
      } finally {
        setIsLoading(false); // ✅ fin du chargement
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((prod) =>
    prod.libelle_produit?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Box p={[2, 4, 6]}>
      <Heading mb={6} size="lg" textAlign="center">
        🛍 Nos Produits
      </Heading>

      {isLoading ? (
        <Center py={10}>
          <Spinner size="xl" color="teal.500" />
        </Center>
      ) : error ? (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      ) : filteredProducts.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          Aucun produit trouvé.
        </Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id_produit} product={prod} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default HomePage;