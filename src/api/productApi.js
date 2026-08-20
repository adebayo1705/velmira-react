import authFetch from "./authFetch";

// ============================
// GET ALL PRODUCTS
// ============================

export const getProducts = async () => {
  return await authFetch("/products");
};