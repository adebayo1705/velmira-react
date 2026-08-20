import authFetch from "./authFetch";


// ============================
// CREATE ORDER
// ============================

export const createOrder = async (
  orderData
) => {

  return await authFetch(
    "/orders",
    {

      method:
        "POST",

      body:
        JSON.stringify(orderData)

    }
  );

};


// ============================
// GET MY ORDERS
// ============================

export const getMyOrders = async () => {

  return await authFetch(
    "/orders/my-orders"
  );

};


// ============================
// GET ONE ORDER
// ============================

export const getOrderById = async (
  orderId
) => {

  return await authFetch(
    `/orders/${orderId}`
  );

};


// ============================
// UPDATE ORDER
// ============================

export const updateOrder = async (
  orderId,
  orderData
) => {

  return await authFetch(
    `/orders/${orderId}`,
    {

      method:
        "PUT",

      body:
        JSON.stringify(orderData)

    }
  );

};