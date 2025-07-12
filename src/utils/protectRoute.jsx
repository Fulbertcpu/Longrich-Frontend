import { Navigate } from "react-router-dom";

const ProtectRoute =({Children})=>{
 const token = localStorage.getItem('token');

 if(!token){
    return <Navigate to ="/SignUpModal"/>
 }

 return Children;
}

export default ProtectRoute;