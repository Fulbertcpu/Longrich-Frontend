import { useState,useEffect } from "react";
import { 
    FormControl,
    FormLabel,
    Input,
    Box,
    Heading,
    Select,
    Button,
    VStack,
     Center,
     FormErrorMessage,
     Alert,
     AlertIcon
     } from "@chakra-ui/react";
import { fetchWithToken } from "../utils/fetchWithToken";
import { useNavigate } from "react-router-dom";
const LoginForm =({onClose})=>{
       const navigate = useNavigate()

       const[formData,setFormData] = useState({
                email:'',
                mot_de_passe:''
               });
               const[erreurs,setErreurs] = useState({});
            
               const[globalError,setglobalError] = useState("")
            
               const[formSubmited,setFormSubmited] =useState(false)
            
               const host = import.meta.env.VITE_API_URL;
  
              const handlSubmit = async(e)=>{
                 e.preventDefault()
                 setErreurs({});
                 setglobalError("");
                 setFormSubmited(true)
            
                 try {
                    const res = await fetchWithToken(`${host}/user/login`,{
                        method:"post",
                        headers:{},
                        body:JSON.stringify(formData)
                    });
                  
                    setFormData({
                      email:'',
                      mot_de_passe:''
                    })
                    const data = await res.json()
                   // Juste après avoir reçu les erreurs
                   if(res.ok){
                     const token = data.accessToken;
                     const utilisateur = data.utilisateur

                     localStorage.setItem('token',token);
                      localStorage.setItem('utilisateur',JSON.stringify(utilisateur))
                    onClose()
                    navigate("/")
                   }
            if (!res.ok) {
              if (Array.isArray(data)) {
                // Transformer le tableau d’erreurs en objet clé-valeur
                const formattedErrors = {};
                data.forEach(err => {
                  if (!formattedErrors[err.path]) {
                    formattedErrors[err.path] = err.msg;
                  }
                });
                setErreurs(formattedErrors);
              } else if(data.error){
                console.log(data.error)
                setglobalError(data.error || "Erreur inconnue");
              }
            }

                 } catch (error) {
                    setglobalError("Erreur de connexion au serveur")
                 }
              }
            
        
            
              const handleChange =(e)=>{
                const {name,value} = e.target;
                 setFormData((prev)=>({
                  ...prev,
                  [name]:value
                 }))
              }
         return(
                   <Box
                   maxW={"500px"}
                   mx={"auto"}
                   mt={10}
                   p={6}
                   borderWidth={1}
                   borderRightRadius={"lg"}
                   boxShadow={"lg"}
                   bg={"white"}
                   >
                    <Heading as={"h2"} size={"lg"} mb={6} textAlign={"Center"} color={"green.600"}>Connexion</Heading>
                    
                    {globalError && (
                        <Alert status="error" mb={4}>
                            <AlertIcon/>
                            {globalError}
                        </Alert>
                    )}
                     <form onSubmit={handlSubmit}>
                      <VStack spacing={4}>
                      
                        <FormControl isInvalid={formSubmited && erreurs.email} >
                        <FormLabel>Email :</FormLabel>
                        <Input type="email"
                         name="email" 
                         value={formData.email} 
                         onChange={handleChange} />
                        <FormErrorMessage>{erreurs.email}</FormErrorMessage>
                       </FormControl>
            
                        <FormControl isInvalid={formSubmited && erreurs.mot_de_passe} >
                        <FormLabel>Mot de passe :</FormLabel>
                        <Input type="password" 
                        name="mot_de_passe" 
                        value={formData.mot_de_passe} 
                        onChange={handleChange} />
                        <FormErrorMessage>{erreurs.mot_de_passe}</FormErrorMessage>
                       </FormControl>
                       <Box width="full" textAlign="right">
                        <Button variant="link" colorScheme="blue" onClick={() => window.location.href = "/forgot-password"}>
                          Mot de passe oublié ?
                        </Button>
                       </Box>

                       <Button type="submit" colorScheme="green" width={"full"}>Envoyer</Button>
                      </VStack>
                     </form>
                   </Box>
        )
     }


     export default LoginForm