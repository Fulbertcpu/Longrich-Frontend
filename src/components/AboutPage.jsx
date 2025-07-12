import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  Button,
  Icon,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaHandshake, FaLeaf, FaMoneyBillWave, FaPhone, FaEnvelope } from "react-icons/fa";

function AboutPage() {
  return (
    <Box px={[4, 6, 10]} py={10}>
      {/* Présentation de Longrich */}
      <Stack spacing={6} mb={12} textAlign="center">
        <Heading size="xl" color="teal.600">🌿 Bienvenue chez LongrichShop</Heading>
        <Text fontSize="lg">
          Longrich est une entreprise internationale spécialisée dans les produits de santé, de beauté et de bien-être, basée sur des ingrédients naturels et une technologie innovante.
        </Text>
        <Image
          src="centre.webp"
          alt="Longrich"
          borderRadius="lg"
          maxH="400px"
          objectFit="cover"
          mx="auto"
        />
         <Image
          src="centre2.jpg"
          alt="Longrich"
          borderRadius="lg"
          maxH="400px"
          objectFit="cover"
          mx="auto"
        />
      </Stack>

      {/* Produits en valeur */}
      <Stack spacing={6} mb={12}>
        <Heading size="lg" color="teal.500">🌱 Nos Produits</Heading>
        <Text>
          Nos produits sont conçus pour améliorer la santé, renforcer le système immunitaire et embellir le quotidien. Ils sont à base de plantes, sans effets secondaires.
        </Text>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          <Image src="/public/prod1.webp" alt="Produit 1" borderRadius="md" />
         
        </SimpleGrid>
           <Box mt={6}>
             <video
              src="https://res.cloudinary.com/dnrqeqvyf/video/upload/v1752051381/AQMv5h6yINj-JCXSvMsdmMa-MSz-S3oD-JUWIiwoJiZwHY8PIubHTC6apcR1eGzU0xVLOmDH9-koEovA1uxk_roi_klolk8.mp4"
              controls
              style={{ width: "100%", borderRadius: "10px", maxHeight: "400px", objectFit: "cover" }}
            />        
            </Box>
      </Stack>

{/* Opportunité de Partenariat */}
<Stack spacing={6} mb={12}>
  <Heading size="lg" color="teal.500">🤝 Opportunité de Partenariat</Heading>
  <Text>
    Rejoindre Longrich, c’est accéder à une opportunité de revenu durable grâce à notre système de marketing de réseau.
  </Text>

  <SimpleGrid columns={[1, 2]} spacing={6}>
    <Image src="/OP.webp" alt="Opportunité 1" borderRadius="md" />
  </SimpleGrid>

  {/* Intégration de la vidéo */}
  <Box mt={6}>
    <video
      src="https://res.cloudinary.com/dnrqeqvyf/video/upload/v1751489436/VID-20250624-WA0014_rwlv1x.mp4"
      controls
      style={{ width: "100%", borderRadius: "10px", maxHeight: "400px", objectFit: "cover" }}
    />
  </Box>

  <Button
    colorScheme="teal"
    size="lg"
    mt={6}
    as="a"
    href="https://wa.me/2250797593739"
    target="_blank"
    rel="noopener noreferrer"
  >
    Rejoindre l'aventure
  </Button>
</Stack>


{/* Contact */}
<Stack spacing={6} mt={12} textAlign="center">
  <Heading size="lg" color="teal.500">📞 Contact</Heading>

  <Stack
    direction={useBreakpointValue({ base: "column", md: "row" })}
    justify="center"
    align="center"
    spacing={4}
  >
    <Stack direction="row" align="center">
      <Icon as={FaPhone} />
      <Text>+225 05 74 98 12 83</Text>
    </Stack>
    <Stack direction="row" align="center">
      <Icon as={FaEnvelope} />
      <Text>longrichsteam@gmail.com</Text>
    </Stack>
  </Stack>

  <Text fontSize="sm" color="gray.500">
    N'hésitez pas à nous contacter pour plus d'informations ou pour rejoindre notre réseau.
  </Text>
</Stack>
    </Box>
  );
}

export default AboutPage;
