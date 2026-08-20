import authFetch from "./authFetch";


// ========================================
// INITIALIZE PAYSTACK PAYMENT
// ========================================

export const initializePayment = async ({
  email,
  amount,
  reference,
}) => {

  return await authFetch(
    "/payment/initialize",
    {

      method: "POST",

      body: JSON.stringify({

        email,

        amount,

        reference,

      }),

    }
  );

};


// ========================================
// VERIFY PAYSTACK PAYMENT
// ========================================

export const verifyPayment = async (
  reference
) => {

  return await authFetch(
    `/payment/verify/${reference}`
  );

};