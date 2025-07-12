export async function refreshToken() {
  const host = import.meta.env.VITE_API_URL;
  
  const response = await fetch(`${host}/refresh-token`, {
    method: "POST",
    credentials : "include",
    headers: {
      "Content-Type": "application/json",
    }
  });
  if (!response.ok) {
    throw new Error("Le refresh token est invalide ou expiré.");
  }

  const data = await response.json();
  // Exemple de data : { accessToken: "xxx", refreshToken: "yyy" }

  // Mets à jour les tokens
  localStorage.setItem("token", data.accessToken);
  if (data.refreshToken) {
    localStorage.setItem("token", data.refreshToken);
  }
  return data.accessToken;
}
