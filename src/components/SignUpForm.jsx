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
import { useNavigate } from "react-router-dom";
const SignUpForm =({onClose})=>{
   const[formData,setFormData] = useState({
    nom_utilisateur:'',
    prenom_utilisateur:'',
    email:'',
    mot_de_passe:'',
    contact:'',
    id_pays:0
   });
   const[erreurs,setErreurs] = useState({});

   const[globalError,setglobalError] = useState("")

   const[formSubmited,setFormSubmited] =useState(false)

   const[pays,setPays] = useState([])
   const host = import.meta.env.VITE_API_URL;
  
  const navigate = useNavigate()


  const handlSubmit = async(e)=>{
     e.preventDefault()
     setErreurs({});
     setglobalError("");
     setFormSubmited(true)

     try {
        const res = await fetch(`${host}/user/register`,{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        });

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
  } else {
    setglobalError(data.message || "Erreur inconnue");
  }
}

     } catch (error) {
        setglobalError("Erreur de connexion au serveur")
     }
  }


    useEffect(()=>{
         fetch(`${host}/contry/allContry`)
         .then(res=>res.json())
         .then(data=>{
            setPays(data)

         })
         .catch(err=>console.log("erreur",err))
    },[]);

  const handleChange =(e)=>{
    const {name,value} = e.target;
     setFormData((prev)=>({
         ...prev,
        [name]:name === "id_pays" ? parseInt(value) : value
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
        <Heading as={"h2"} size={"lg"} mb={6} textAlign={"Center"} color={"green.600"}>Inscription</Heading>
        
        {globalError && (
            <Alert status="error" mb={4}>
                <AlertIcon/>
                {globalError}
            </Alert>
        )}
         <form onSubmit={handlSubmit}>
          <VStack spacing={4}>
            <FormControl isInvalid={formSubmited && erreurs.nom_utilisateur}>
            <FormLabel>Nom :</FormLabel>
            <Input
             type="text"
             name="nom_utilisateur"
              value={formData.nom_utilisateur}
              onChange={handleChange} />
              <FormErrorMessage>{erreurs.nom_utilisateur}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formSubmited && erreurs.prenom_utilisateur} >
            <FormLabel>Prenom :</FormLabel>
            <Input type="text"
             name="prenom_utilisateur" 
             value={formData.prenom_utilisateur} 
             onChange={handleChange} />
             <FormErrorMessage>{erreurs.prenom_utilisateur}</FormErrorMessage>
            </FormControl>

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

            <FormControl isInvalid={formSubmited && erreurs.contact} >
            <FormLabel>Numéro :</FormLabel>
            <Input type="text" 
            name="contact" 
            value={formData.contact} 
            onChange={handleChange} />
            <FormErrorMessage>{erreurs.contact}</FormErrorMessage>
           </FormControl>
           

           <FormControl isInvalid={formSubmited && erreurs.id_pays}>
            <FormLabel>Pays :</FormLabel>
            <Select
             placeholder="Choisir un pays"
              name="id_pays" 
              value={formData.id_pays} 
               onChange={handleChange}>
             {pays.map((p)=>(
              <option  key={p.id_pays} value={p.id_pays}>
                  {p.nom_pays}
                  </option>
             ))}
            </Select>
            <FormErrorMessage>{erreurs.id_pays}</FormErrorMessage>
           </FormControl>

           <Button type="submit" colorScheme="green" width={"full"}>Envoyer</Button>
          </VStack>
         </form>
       </Box>
    )
    
}

export default SignUpForm;