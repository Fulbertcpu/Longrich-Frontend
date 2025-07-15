import {
  Box,
  Heading,
  Text,
  Stack,
  Collapse,
  Button,
  Flex,
  Spacer,
  Badge,
  useDisclosure,
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { fetchWithToken } from "../utils/fetchWithToken";

const host = import.meta.env.VITE_API_URL;

export default function OrderHistoryPage() {
  const user = JSON.parse(localStorage.getItem("utilisateur"));
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetchWithToken(`${host}/commandes/userCommandes`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {}
    };
    fetchOrders();
  }, [user.id_utilisateur]);

  const toggleExpand = (id_commande) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [id_commande]: !prev[id_commande],
    }));
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  const components = {
     hr: ({node, ...props}) => <hr style={{ margin: '1rem 0' }} {...props} />,

    h1: ({ node, ...props }) => (
      <Heading as="h1" size="lg" color="teal.600" mt={6} mb={4} {...props} />
    ),
    h2: ({ node, ...props }) => (
      <Heading as="h2" size="lg" color="teal.600" mt={6} mb={4} {...props} />
    ),
    h3: ({ node, ...props }) => (
      <Heading as="h3" size="md" color="teal.500" mt={4} mb={2} {...props} />
    ),
    h4: ({ node, ...props }) => (
      <Heading as="h4" size="sm" color="teal.600" mt={3} mb={2} {...props} />
    ),
    p: ({ node, children, ...props }) => {
      const isWarning =
        typeof children === "string" && children.includes("Précaution");
      return (
        <Box
          bg={isWarning ? "red.200" : "transparent"}
          borderLeft={isWarning ? "4px solid red" : "none"}
          p={isWarning ? 3 : 0}
          my={isWarning ? 4 : 0}
        >
          <Text fontSize="md" color={isWarning ? "red.800" : "inherit"} {...props}>
            {children}
          </Text>
        </Box>
      );
    },
    ul: ({ node, ...props }) => (
      <UnorderedList pl={5} mb={3} {...props} />
    ),
    li: ({ node, ...props }) => <ListItem mb={2} {...props} />,
    strong: ({ node, ...props }) => (
      <Text as="strong" fontWeight="bold" color="red.600" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
      <Box bg="gray.50" p={4} borderLeft="4px solid teal" my={4} {...props} />
    ),
  };

  function sanitizeMarkdown(mdText) {
  return mdText
    .replace(/([^\n])\n---/g, '$1\n\n---')   // ligne vide avant ---
    .replace(/([^\n])\n###/g, '$1\n\n###');  // ligne vide avant ###
}



  return (
    <Box p={[3, 6]} maxW="800px" mx="auto">
      <Heading mb={6} textAlign="center">
        📜 Historique des Commandes
      </Heading>
      <Box padding="10px" mb="5px">
        <Text color="red" fontWeight="bolder">
          NB: Payer à la réception (signaler toute demande de paiement avant la
          réception en dehors de l'expédition)
        </Text>
        <Text
          color={"blue"}
          as={"a"}
          href="https://wa.me/2250797593739"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contactez Nous ici
        </Text>
      </Box>
      <Stack spacing={5}>
        {orders.length === 0 && (
          <Text textAlign="center" color="gray.500">
            Aucune commande trouvée.
          </Text>
        )}

        {orders.map((order) => (
          <Box
            key={order.id_commande}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            boxShadow="sm"
          >
            <Flex align="center" mb={2}>
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  Commande #{order.id_commande}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Commandée le: {formatDate(order.date_commande)} - Livraison prévue le:{" "}
                  {formatDate(order.date_livre)}
                </Text>
              </Box>
              <Spacer />
              <Badge
                colorScheme={
                  order.status_commande === "Livrée"
                    ? "green"
                    : order.status_commande === "Annulée"
                    ? "red"
                    : "yellow"
                }
                textTransform="capitalize"
              >
                {order.status_commande}
              </Badge>
            </Flex>

            <Text fontWeight="semibold" mb={1}>
              Prix total :{" "}
              {order.prix_total_commande != null
                ? Number(order.prix_total_commande).toLocaleString() + " FCFA"
                : "N/A"}
            </Text>

            <Text mb={1}>
              Distributeur :
              <strong>
                {" "}
                {order.distributeur?.nom || "Inconnu"} -{" "}
                {order.distributeur?.contact || "N/A"}
              </strong>
            </Text>

            <Text mb={2}>Adresse de livraison : {order.adresse_livre_commande}</Text>

            <Button size="sm" onClick={() => toggleExpand(order.id_commande)} mb={2}>
              {expandedOrders[order.id_commande]
                ? "Cacher les produits -"
                : "Voir les produits +"}
            </Button>

            <Collapse in={expandedOrders[order.id_commande]} unmountOnExit>
              <VStack spacing={3} align="stretch" borderTop="1px solid #eee" pt={3}>
                {order.produits.map((prod) => (
                  <Box key={prod.id_produit} p={2} borderWidth="1px" borderRadius="md">
                    <Text fontWeight="bold">{prod.libelle_produit}</Text>
                      <ReactMarkdown
                      //  remarkPlugins={[remarkGfm, remarkBreaks]}
                        components={components}>
                        {sanitizeMarkdown(String(prod.description_produit || ""))}
                      </ReactMarkdown>
                    
                    <Text fontSize="sm">
                      Quantité: {prod.qte} x{" "}
                      {prod.prix_unitaire != null
                        ? Number(prod.prix_unitaire).toLocaleString()
                        : "N/A"}{" "}
                      FCFA
                    </Text>
                    <Text fontWeight="semibold" mt={1}>
                      Total:{" "}
                      {prod.qte != null && prod.prix_unitaire != null
                        ? (prod.qte * prod.prix_unitaire).toLocaleString()
                        : "N/A"}{" "}
                      FCFA
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Collapse>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
