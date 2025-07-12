
  // utils/addToCart.js
import { fetchWithToken } from "./fetchWithToken";
const host = import.meta.env.VITE_API_URL;

export async function addToCart(id_produit) {
  const res = await fetchWithToken(`${host}/carts/addProduct`, {
    method: "POST",
    body: JSON.stringify({
      id_produit,
      quantite: 1
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erreur lors de l'ajout au panier");
  }
  return res.json();
}
