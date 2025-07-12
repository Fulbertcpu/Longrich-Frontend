import ProductModal from "./addProductModal";
import { Box, Heading, Flex, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductEditModal from "./ProductEditModal";
import { fetchWithToken } from "../../utils/fetchWithToken";

const ProduitAdminPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: openEdit, onClose: closeEdit } = useDisclosure();
  const token = localStorage.getItem("token");
  const host = import.meta.env.VITE_API_URL;
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${host}/products/allProducts`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    openEdit();
  };

  const handleUpdateSubmit = async (updatedProduct) => {
    try {
      const response = await fetchWithToken(`${host}/products/${selectedProduct.id_produit}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
      });

      const updated = await response.json();
      setProducts((prev) =>
        prev.map((p) => (p.id_produit === updated.id_produit ? updated : p))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleDelete = async (id_produit) => {
    try {
      const response = await fetchWithToken(`${host}/products/${id_produit}`, {
        method: "DELETE",
        headers: {},
      });

      if (!response.ok) throw new Error("Échec suppression");
      setProducts(products.filter((p) => p.id_produit !== id_produit));
    } catch (error) {
    }
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <Box pt="80px" px={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>Gestion des Produits</Heading>
        <ProductModal />
      </Flex>

      <ProductDetailsModal isOpen={isOpen} onClose={onClose} product={selectedProduct} />
      <ProductEditModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        product={selectedProduct}
        onSubmit={handleUpdateSubmit}
      />

      <Box mt={6}>
        {products.map((product) => (
          <ProductCard
            key={product.id_produit}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProduitAdminPage;
