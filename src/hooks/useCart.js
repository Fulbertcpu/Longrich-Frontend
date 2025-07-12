import { useState, useEffect } from "react";
import { fetchWithToken } from "../utils/fetchWithToken";

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState("0.00");
  const [id_panier , setId_panier] = useState(0)
const host = import.meta.env.VITE_API_URL;
 
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetchWithToken(`${host}/carts/products`);
      const data = await res.json();

      if (data && data.produits) {
        setCartItems(data.produits);
        setTotal(data.prix_total_panier);
        setId_panier(data.id_panier)

      } else {
        setCartItems([]);
        setTotal("0.00");
      }
    } catch (err) {
      console.error("Erreur chargement panier", err);
      setCartItems([]);
      setTotal("0.00");
    }
  };
  const updateQuantity = async (id_produit, newQuantite) => {
    try {
      if (newQuantite <= 0) {
        await fetchWithToken(`${host}/carts/${id_produit}`, {
          method: "DELETE"
        });
        setCartItems(prev => prev.filter(p => p.id_produit !== id_produit));
      } else {
        await fetchWithToken(`${host}/carts/upDateProduct`, {
          method: "PUT",
          body: JSON.stringify({ id_produit, quantite: newQuantite })
        });
        setCartItems(prev =>
          prev.map(p =>
            p.id_produit === id_produit ? { ...p, qte: newQuantite } : p
          )
        );
      }
      // Recharger le panier après modification pour récupérer le nouveau total à jour
      await fetchCart();
    } catch (err) {
    }
  };

  return { cartItems, updateQuantity, total,id_panier };
}
