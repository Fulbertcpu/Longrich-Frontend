import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  Select,
  Button,
  VStack,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { fetchWithToken } from "../../utils/fetchWithToken";

const AddProductForm = ({onClose}) => {
  const host = import.meta.env.VITE_API_URL;
  const toast = useToast();

 const [productData, setProductData] = useState({
  libelle_produit: "",
  prix_unitaire: 0,
  categorie: "",
  description_produit: "",
  image: "" // <= chaîne, pas tableau
});


  const token = localStorage.getItem("token");

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...productData,
    image: productData.image
      .split(/[\n,]+/)
      .map((url) => url.trim())
      .filter(Boolean)
  };

  try {
    const res = await fetchWithToken(`${host}/products/add`, {
      method: "POST",
      headers: {},
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    console.log("res:",result)
    if (res.ok) {
      toast({
        title: "Produit ajouté avec succès",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      setProductData({
        libelle_produit: "",
        prix_unitaire: 0,
        categorie: "",
        description_produit: "",
        image: ""
      });
      onClose()
    } else {
      toast({
        title: "Erreur",
        description: result.message || "Échec de l'ajout",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Erreur",
      description: "Erreur réseau",
      status: "error",
      duration: 3000,
      isClosable: true
    });
  }
};


  const handleChange = (e) => {
  const { name, value } = e.target;
  setProductData((prev) => ({
    ...prev,
    [name]: value
  }));
};


  return (
    <Box
      maxW="500px"
      mx="auto"
      mt={10}
      px={{ base: 4, md: 8 }}
      py={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading
        as="h2"
        size="lg"
        mb={6}
        textAlign="center"
        color="green.600"
      >
        Nouveau Produit
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <Input
              placeholder="Libellé..."
              type="text"
              name="libelle_produit"
              value={productData.libelle_produit}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <Input
              placeholder="Prix..."
              type="number"
              name="prix_unitaire"
              value={productData.prix_unitaire}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Images (une URL par ligne)</FormLabel>
            <Textarea
              name="image"
              value={productData.image}
              onChange={handleChange}
              placeholder={`https://image1.jpg\nhttps://image2.jpg`}
            />
          </FormControl>

          <FormControl>
            <Select
              placeholder="Catégorie"
              name="categorie"
              value={productData.categorie}
              onChange={handleChange}
            >
              <option>Santé</option>
              <option>Bien-être</option>
              <option>Hygiène</option>
              <option>Local</option>
            </Select>
          </FormControl>

          <FormControl>
            <Textarea
              placeholder="Description..."
              height="25vh"
              name="description_produit"
              value={productData.description_produit}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="green" width="full">
            Ajouter
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddProductForm;
