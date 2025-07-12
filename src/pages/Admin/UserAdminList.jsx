import {
  Box, Heading, IconButton, List, ListItem, HStack, Text, useToast
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { fetchWithToken } from "../../utils/fetchWithToken";

const  UserAdminList  =()=> {
  const [users, setUsers] = useState([]);
  const toast = useToast();
    const host = import.meta.env.VITE_API_URL;

  // 🔁 Récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const res = await fetchWithToken(`${host}/user/users`);
      const data = await res.json();
      setUsers(data);
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // ❌ Supprimer un utilisateur
  const handleDelete = async (id_utilisateur) => {
    try {
      const res = await fetchWithToken(`${host}/user/${id_utilisateur}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast({
        title: "Utilisateur supprimé",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      fetchUsers(); // 🔁 Recharger la liste
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer cet utilisateur.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Box p={4}>
      <Heading fontSize="xl" mb={4}>Liste des utilisateurs</Heading>
      <List spacing={3}>
        {users.map((user) => (
          <ListItem key={user.id_utilisateur}>
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="bold">{user.prenom_utilisateur} {user.nom_utilisateur}</Text>
                 <Text fontSize="sm" color="green">{user.utilisateur_role}</Text>
                 <Text fontSize="sm" color="gray.500">{user.contact}</Text>
                <Text fontSize="sm" color="gray.500">{user.email}</Text>
              </Box>
              <IconButton
                colorScheme="red"
                icon={<DeleteIcon />}
                aria-label="Supprimer"
                onClick={() => handleDelete(user.id_utilisateur)}
              />
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default UserAdminList;
