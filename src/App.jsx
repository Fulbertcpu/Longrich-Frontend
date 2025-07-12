import Navbar from "./components/Navbar/Navbar.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpModal from "./pages/SignUp.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ProduitAdminPage from "./pages/Admin/ProduitAdminPage.jsx";
import CommandeAdminPage from "./pages/Admin/CommandeAdminPage.jsx";
import DistributeurAdminPage from "./pages/Admin/DistributeurAdminPage.jsx";
import UserAdminList from "./pages/Admin/UserAdminList.jsx";
import ZoneManager from "./pages/Admin/ZoneManager.jsx";
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import AdminPacksPage from "./pages/Admin/AdminPacksPage.jsx";
import PacksPage from "./components/PacksPage.jsx";
import OrderHistoryPage from "./components/OrderHistoryPage.jsx";
import DistributorOrdersPage from "./components/DistributorOrdersPage.jsx";
import AppFooter from "./components/AppFooter.jsx";
import AboutPage from "./components/AboutPage.jsx";
import ForgotPasswordForm from "./components/ForgotPasswordForm.jsx";
import ResetPasswordForm from "./components/ResetPasswordForm.jsx";
function App() {
  return (
    <>
      <Navbar/>
         <Routes>
          <Route path="/SignUpModal" element={<SignUpModal />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/produits" element={<ProduitAdminPage />} />
          <Route path="/admin/commandes" element={<CommandeAdminPage />} />
          <Route path="/admin/distributeurs" element={<DistributeurAdminPage />} />
           <Route path="/admin/utilisateurs" element={<UserAdminList/>} />
          <Route path="/admin/packs" element={<AdminPacksPage/>} />
          <Route path="/admin/zones" element={<ZoneManager/>} />
           <Route path="/panier" element={<CartPage/>} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/packs" element={<PacksPage/>} />
          <Route path="/commandes" element={<OrderHistoryPage/>} />
          <Route path="/distributeur" element={<DistributorOrdersPage/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/forgot-password" element={<ForgotPasswordForm/>} />
          <Route path="/reset-password/:token" element={<ResetPasswordForm/>} />


         </Routes>
    <AppFooter/>
    </>
  )
}

export default App
