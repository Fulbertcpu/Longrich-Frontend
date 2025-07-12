import {
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Button,
  Checkbox,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";

const EditProductForm = ({ product, onSubmit, onClose }) => {
 const [formData, setFormData] = useState({
  libelle_produit: product.libelle_produit,
  description_produit: product.description_produit,
  prix_unitaire: product.prix_unitaire,
  categorie: product.categorie,
  image: (product.image ?? []).join("\n"), // sécurise contre undefined
  replaceImages: false,
});


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   const payload = {
  libelle_produit: formData.libelle_produit,
  description_produit: formData.description_produit,
  prix_unitaire: formData.prix_unitaire,
  categorie: formData.categorie,
  image: formData.image
    .split("\n") // Séparation par ligne (Entrée)
    .map(url => url.trim()) // Supprime les espaces autour
    .filter(url => url.length > 0), // Ignore les lignes vides
  replaceImages: formData.replaceImages,
};


    onSubmit(payload);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Libellé</FormLabel>
          <Input name="libelle_produit" value={formData.libelle_produit} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea name="description_produit" value={formData.description_produit} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Prix unitaire</FormLabel>
          <Input name="prix_unitaire" type="number" value={formData.prix_unitaire} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Catégorie</FormLabel>
          <Select name="categorie" value={formData.categorie} onChange={handleChange}>
            <option>Bien être</option>
            <option>Santé</option>
            <option>Hygiène</option>
          </Select>
        </FormControl>

        <FormControl>
       <FormLabel>Images (une URL par ligne)</FormLabel>
      <Textarea
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder={`https://image1.jpg\nhttps://image2.jpg`}
      />
     </FormControl>


        <FormControl>
          <Checkbox name="replaceImages" isChecked={formData.replaceImages} onChange={handleChange}>
            Remplacer les anciennes images
          </Checkbox>
        </FormControl>

        <Button colorScheme="blue" type="submit" width="full">
          Enregistrer
        </Button>
      </VStack>
    </form>
  );
};

export default EditProductForm;
