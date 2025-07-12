import {
  Box,
  Button,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddPackModal from "./AddPackModal";
import EditPackModal from "./EditPackModal";
import { fetchWithToken } from "../../utils/fetchWithToken";

export default function AdminPacksPage() {
  const [packs, setPacks] = useState([]);
  const [packEdit, setPackEdit] = useState(null);
const host = import.meta.env.VITE_API_URL;

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure();

  const chargerPacks = async () => {
    try {
      const res = await fetchWithToken(`${host}/packs/all`);
      const data = await res.json();
      setPacks(data);
    } catch (err) {
      console.error("Erreur chargement des packs :", err);
    }
  };

  useEffect(() => {
    chargerPacks();
  }, []);

  const handleDelete = async (id_pack) => {
    const confirm = window.confirm("Confirmer la suppression du pack ?");
    if (!confirm) return;

    try {
      const res = await fetchWithToken(`${host}/packs/${id_pack}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      chargerPacks();
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  const handleEdit = (pack) => {
    setPackEdit(pack);
    onEditOpen();
  };

  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>Gestion des packs de traitement</Heading>

      <Button onClick={onAddOpen} colorScheme="blue" mb={4}>
        Ajouter un pack
      </Button>

     {packs.length === 0 ? (
  <Text>Aucun pack trouvé.</Text>
) : (
  <Box overflowX="auto">
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>Libellé</Th>
          <Th>Description</Th>
          <Th>Prix total</Th>
          <Th>Produits</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {packs.map((pack) => (
          <Tr key={pack.id_pack}>
            <Td>{pack.libelle_pack}</Td>
            <Td>{pack.description_pack}</Td>
            <Td>{Number(pack.prix_total_pack).toLocaleString()} FCFA</Td>
            <Td>
              {pack.produits.map((p) => (
                <Box key={p.id_produit}>
                  • {p.libelle_produit} (x{p.qte})
                </Box>
              ))}
            </Td>
            <Td>
              <HStack spacing={2} wrap="wrap">
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => handleEdit(pack)}
                >
                  Modifier
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(pack.id_pack)}
                >
                  Supprimer
                </Button>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
)}


      <AddPackModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onPackAdded={chargerPacks}
      />

      {packEdit && (
        <EditPackModal
          isOpen={isEditOpen}
          onClose={() => {
            setPackEdit(null);
            onEditClose();
          }}
          pack={packEdit}
          onPackUpdated={chargerPacks}
        />
      )}
    </Box>
  );
}
