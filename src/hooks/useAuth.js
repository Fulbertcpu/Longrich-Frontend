
const useAuth =()=>{
    const token = localStorage.getItem("token");
  let utilisateur = null;
  try {
    const data = localStorage.getItem('utilisateur');
     if (data && data !== "undefined") {
    utilisateur = JSON.parse(data);
  }
} catch (e) {
  console.error("Erreur lors du parsing du localStorage utilisateur :", e);
}

   
    return{
        isAuthenticated:!!token,
        token,
        utilisateur,
        role:utilisateur?.utilisateur_role

    }
}

export default useAuth;