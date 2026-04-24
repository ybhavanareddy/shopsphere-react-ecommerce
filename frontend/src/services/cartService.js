const BASE_URL = `${import.meta.env.VITE_API_URL}/api/cart`;

const getToken = () => localStorage.getItem("token");

// Get cart
export const fetchCart = async () => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return await res.json();
};

// Add to cart
export const addToCartAPI = async (productId) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ productId })
  });

  return await res.json();
};

// Update quantity
export const updateCartAPI = async (productId, quantity) => {
  const res = await fetch(`${BASE_URL}/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ quantity })
  });

  return await res.json();
};

// Remove item
export const removeFromCartAPI = async (productId) => {
  const res = await fetch(`${BASE_URL}/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return await res.json();
};

// Clear cart
export const clearCartAPI = async () => {
  const res = await fetch(`${BASE_URL}/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return await res.json();
};