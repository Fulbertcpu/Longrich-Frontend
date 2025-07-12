// src/pages/admin/AdminDashboard.jsx
import {
  Box,
  Heading,
  SimpleGrid,
  Button,
  Icon,
} from "@chakra-ui/react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaTruck,
  FaMapMarkerAlt,
  FaBriefcaseMedical, // <-- icône pour les zones
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const items = [
    {
      label: "Gestion des produits",
      icon: FaBoxOpen,
      route: "/admin/produits",
    },
    {
      label: "Gestion des commandes",
      icon: FaClipboardList,
      route: "/admin/commandes",
    },
    {
      label: "Gestion des distributeurs",
      icon: FaTruck,
      route: "/admin/distributeurs",
    },
    {
      label: "Gestion des utilisateurs",
      icon: FaUsers,
      route: "/admin/utilisateurs",
    },
    {
      label: "Gestion des zones", // ✅ nouvelle entrée
      icon: FaMapMarkerAlt,
      route: "/admin/zones",
    },
    {
      label: "Gestion des packs de traitement", // ✅ nouvelle entrée
      icon: FaBriefcaseMedical , // icône adaptée
      route: "/admin/packs",
    },
  ];

  return (
    <Box p={8}>
      <Heading mb={6} textAlign="center">
        Tableau de bord Administrateur
      </Heading>
      <SimpleGrid columns={[1, 2, 2, 4]} spacing={6}>
        {items.map(({ label, icon, route }) => (
          <Button
            key={label}
            height="120px"
            flexDirection="column"
            onClick={() => navigate(route)}
            leftIcon={<Icon as={icon} boxSize={6} />}
            variant="outline"
            _hover={{ bg: "green.50" }}
          >
            {label}
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default AdminDashboard;
