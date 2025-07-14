import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box, Heading, VStack, FormControl, FormLabel, Input,
  Button, FormErrorMessage, Alert, AlertIcon
} from "@chakra-ui/react";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");
  const host = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    if (newPassword !== confirm) {
      setErreur("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await fetch(`${host}/user/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Mot de passe réinitialisé avec succès.");
      } else {
        setErreur(data.message || "Erreur lors de la réinitialisation.");
      }
    } catch (err) {
      setErreur("Erreur de connexion au serveur");
    }

    setSubmitted(true);
  };

  return (
    <Box maxW="500px" mx="auto" mt={10} p={6} bg="white" boxShadow="md" borderRadius="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center" color="green.600">
        Réinitialiser le mot de passe
      </Heading>
      {erreur && <Alert status="error" mb={4}><AlertIcon />{erreur}</Alert>}
      {success && <Alert status="success" mb={4}><AlertIcon />{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={submitted && !motDePasse}>
            <FormLabel>Nouveau mot de passe :</FormLabel>
            <Input type="password" value={motDePasse} onChange={(e) => setNewPassword(e.target.value)} />
            <FormErrorMessage>Le mot de passe est requis.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={submitted && !confirm}>
            <FormLabel>Confirmer :</FormLabel>
            <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            <FormErrorMessage>Confirmation requise.</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="green" width="full">
            Réinitialiser
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
