import { useState } from "react";
import {
  Box, Heading, VStack, FormControl, FormLabel, Input,
  Button, FormErrorMessage, Alert, AlertIcon
} from "@chakra-ui/react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");
  const host = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    try {
      const res = await fetch(`${host}/user/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Un email de réinitialisation a été envoyé.");
      } else {
        setErreur(data.message || "Erreur lors de l'envoi.");
      }
    } catch (err) {
      setErreur("Erreur de connexion au serveur");
    }

    setSubmitted(true);
  };

  return (
    <Box maxW="500px" mx="auto" mt={10} p={6} bg="white" boxShadow="md" borderRadius="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center" color="blue.600">
        Mot de passe oublié
      </Heading>
      {erreur && <Alert status="error" mb={4}><AlertIcon />{erreur}</Alert>}
      {success && <Alert status="success" mb={4}><AlertIcon />{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={submitted && !email}>
            <FormLabel>Adresse email :</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormErrorMessage>L'email est requis.</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Envoyer le lien
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ForgotPasswordForm;
