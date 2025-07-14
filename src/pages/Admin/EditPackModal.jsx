import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Box,
  VStack,
  HStack,
  Text,
  Textarea
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchWithToken } from "../../utils/fetchWithToken";

export default function EditPackModal({ isOpen, onClose, pack, onPackUpdated }) {
  const [libelle, setLibelle] = useState("");
  const [description, setDescription] = useState("");
  const [produitsDispo, setProduitsDispo] = useState([]);
  const [produitsChoisis, setProduitsChoisis] = useState([]);
  const [selectedProduitId, setSelectedProduitId] = useState("");
  const [quantite, setQuantite] = useState(1);
 const host = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isOpen && pack) {
      setLibelle(pack.libelle_pack);
      setDescription(pack.description_pack);
      setProduitsChoisis(
        pack.produits.map((p) => ({
          id_produit: p.id_produit,
          qte: p.qte,
          libelle_produit: p.libelle_produit,
        }))
      );

      fetchWithToken(`${host}/products/allProducts`)
        .then((res) => res.json())
        .then((data) => setProduitsDispo(data))
        .catch((err) => console.error("Erreur chargement produits :", err));
    }
  }, [isOpen, pack]);

  const ajouterProduit = () => {
    const id = parseInt(selectedProduitId);
    if (!id || quantite < 1) return;

    const dejaAjoute = produitsChoisis.find(p => p.id_produit === id);
    if (dejaAjoute) {
      alert("Ce produit est déjà ajouté.");
      return;
    }

    setProduitsChoisis([
      ...produitsChoisis,
      {
        id_produit: id,
        qte: quantite,
        libelle_produit: produitsDispo.find(p => p.id_produit === id)?.libelle_produit
      }
    ]);
    setSelectedProduitId("");
    setQuantite(1);
  };

  const supprimerProduit = (id) => {
    setProduitsChoisis(produitsChoisis.filter(p => p.id_produit !== id));
  };

  const handleSubmit = async () => {
    if (!libelle || !description || produitsChoisis.length === 0) {
      alert("Tous les champs sont requis.");
      return;
    }

    try {
      const res = await fetchWithToken(`${host}/packs/upDate`, {
        method: "PUT",
        body: JSON.stringify({
          id_pack     : pack.id_pack,
          libelle_pack: libelle,
          description_pack: description,
          produits: produitsChoisis.map(p => ({
            id_produit: p.id_produit,
            qte: p.qte
          }))
        })
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour du pack");

      onClose();
      onPackUpdated(); // recharge les données
    } catch (err) {
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modifier le pack</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Libellé</FormLabel>
              <Input value={libelle} onChange={(e) => setLibelle(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Ajouter un produit</FormLabel>
              <HStack>
                <Select
                  placeholder="Choisir un produit"
                  value={selectedProduitId}
                  onChange={(e) => setSelectedProduitId(e.target.value)}
                >
                  {produitsDispo.map((p) => (
                    <option key={p.id_produit} value={p.id_produit}>
                      {p.libelle_produit}
                    </option>
                  ))}
                </Select>
                <NumberInput min={1} max={100} value={quantite} onChange={(v) => setQuantite(Number(v))}>
                  <NumberInputField />
                </NumberInput>
                <Button onClick={ajouterProduit} colorScheme="blue">Ajouter</Button>
              </HStack>
            </FormControl>

            {produitsChoisis.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={2}>Produits du pack :</Text>
                <VStack align="start" spacing={1}>
                  {produitsChoisis.map((p, i) => (
                    <HStack key={i} justify="space-between" w="100%">
                      <Text>{p.libelle_produit} (quantité : {p.qte})</Text>
                      <Button size="xs" colorScheme="red" onClick={() => supprimerProduit(p.id_produit)}>
                        Supprimer
                      </Button>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="green" mr={3}>Modifier</Button>
          <Button onClick={onClose}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
