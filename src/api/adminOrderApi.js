import authFetch from "./authFetch";


// ============================
// GET ALL ADMIN ORDERS
// ============================

export const getAdminOrders = async () => {

  return await authFetch(
    "/admin/orders"
  );

};


// ============================
// GET ONE ADMIN ORDER
// ============================

export const getAdminOrderById = async (
  orderId
) => {

  return await authFetch(
    `/admin/orders/${orderId}`
  );

};


// ============================
// UPDATE ORDER STATUS
// ============================

export const updateAdminOrderStatus = async (
  orderId,
  status
) => {

  return await authFetch(

    `/admin/orders/${orderId}/status`,

    {

      method:
        "PUT",

      body:
        JSON.stringify({

          status

        })

    }

  );

};