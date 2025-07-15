import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  IconButton,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

function AppFooter() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} color="gray.600" mt={10}>
      <Container as={Stack} maxW={"6xl"} py={6}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify={"space-between"}
          align={"center"}
        >
          <Text fontWeight="bold" fontSize="lg" mb={{ base: 4, md: 0 }}>
            Longrich Santé+
          </Text>

          <Stack direction={"row"} spacing={6}>
            <Link href="/">Accueil</Link>
            <Link href="/packs">Packs</Link>
            <Link href="/About">À propos</Link>
          </Stack>

          <Stack direction={"row"} spacing={4} mt={{ base: 4, md: 0 }}>
            <IconButton
              as="a"
              href="https://www.facebook.com/share/171R5YvnoX/"
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
            />
          </Stack>
        </Flex>

        {/* Ligne de séparation */}
        <Box borderTop="1px solid" borderColor="gray.200" mt={4} pt={4}>
          <Text textAlign="center" fontSize="sm">
            © {new Date().getFullYear()} Longrich Santé+. Tous droits réservés.
          </Text>
          <Text textAlign="center" fontSize="sm" color="gray.500" mt={1}>
            Développé par <strong>Fulbert Ouattara (Développeur Fullstack)</strong> — Mai 2025
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

export default AppFooter;
