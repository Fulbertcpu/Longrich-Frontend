// utils/fetchWithToken.js
import { refreshToken } from "./refreshToken";


export async function fetchWithToken(url, options = {}) {
  let accessToken = localStorage.getItem("token");
  if (!options.headers) {
    options.headers = {};
  }

  options.headers["Authorization"] = `Bearer ${accessToken}`;
  options.headers["Content-Type"] = "application/json";
  options.credentials = "include";

  let response = await fetch(url, options);
  // Si le token est expiré ou invalide, on tente un refresh
  if (response.status === 403) {
    try {
      const newAccessToken = await refreshToken(); // tente de récupérer un nouveau token
      localStorage.setItem("token", newAccessToken);

      // Réessayer la requête avec le nouveau token
      options.headers["Authorization"] = `Bearer ${newAccessToken}`;
      response = await fetch(url, options);
    } catch (err) {
     // throw err;
    }
  }

  return response;
}
