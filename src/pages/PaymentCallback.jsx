import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  useNavigate,
  useSearchParams
} from "react-router-dom";

import Navbar
  from "../components/layouts/Navbar";

import Footer
  from "../components/layouts/Footer";

import searchProducts
  from "../data/searchProducts";

import {
  verifyPayment
} from "../api/paymentApi";

import {
  getOrderById
} from "../api/orderApi";

import {
  useToast
} from "../context/ToastContext.jsx";

import "../styles/paymentCallback.css";


function PaymentCallback() {

  const navigate =
    useNavigate();


  const [searchParams] =
    useSearchParams();


  const {
    showToast
  } = useToast();


  const [status, setStatus] =
    useState("verifying");


  // ========================================
  // PREVENT DUPLICATE PROCESSING
  // ========================================

  const processingRef =
    useRef(false);


  // ========================================
  // PAYMENT CALLBACK
  // ========================================

  useEffect(() => {

    if (
      processingRef.current
    ) {

      return;

    }


    processingRef.current =
      true;


    // ========================================
    // GET CALLBACK STATUS
    // ========================================

    const callbackStatus =
      searchParams.get(
        "status"
      );


    // ========================================
    // GET PAYMENT REFERENCE
    // ========================================

    const reference =
      searchParams.get(
        "reference"
      );


    // ========================================
    // PAYMENT CANCELLED
    // ========================================

    if (
      callbackStatus ===
      "cancelled"
    ) {

      console.log(
        "PAYSTACK PAYMENT CANCELLED"
      );


      setStatus(
        "cancelled"
      );


      showToast(
        "Payment was cancelled. Your order has not been paid.",
        "error"
      );


      return;

    }


    // ========================================
    // CHECK PAYMENT REFERENCE
    // ========================================

    if (!reference) {

      console.log(
        "NO PAYMENT REFERENCE FOUND"
      );


      setStatus(
        "failed"
      );


      showToast(
        "Payment reference was not found.",
        "error"
      );


      return;

    }


    // ========================================
    // CHECK PREVIOUSLY COMPLETED PAYMENT
    // ========================================

    const completedPayment =
      localStorage.getItem(
        "completedPayment"
      );


    if (completedPayment) {

      try {

        const payment =
          JSON.parse(
            completedPayment
          );


        if (
          payment.reference ===
          reference &&
          payment.orderId
        ) {

          console.log(
            "PAYMENT ALREADY PROCESSED:",
            payment
          );


          setStatus(
            "success"
          );


          showToast(
            "Payment already verified.",
            "success"
          );


          setTimeout(() => {

            navigate(
              `/account/orders/${payment.orderId}`
            );

          }, 3000);


          return;

        }

      } catch (error) {

        console.error(
          "COMPLETED PAYMENT DATA ERROR:",
          error
        );


        localStorage.removeItem(
          "completedPayment"
        );

      }

    }


    // ========================================
    // VERIFY PAYMENT
    // ========================================

    const checkPayment =
      async () => {

        try {

          console.log(
            "VERIFYING PAYMENT:",
            reference
          );


          // ========================================
          // ASK BACKEND TO VERIFY PAYSTACK
          // ========================================

          const result =
            await verifyPayment(
              reference
            );


          console.log(
            "PAYMENT VERIFICATION:",
            result
          );


          // ========================================
          // CHECK BACKEND RESPONSE
          // ========================================

          if (
            result?.status !==
            true
          ) {

            throw new Error(
              "Unable to verify payment with Paystack."
            );

          }


          // ========================================
          // GET PAYSTACK STATUS
          // ========================================

          const paymentStatus =
            result?.data?.status;


          console.log(
            "PAYSTACK PAYMENT STATUS:",
            paymentStatus
          );


          // ========================================
          // PAYMENT FAILED
          // ========================================

          if (
            paymentStatus ===
            "failed"
          ) {

            console.log(
              "PAYSTACK PAYMENT FAILED:",
              reference
            );


            setStatus(
              "failed"
            );


            showToast(
              "Payment failed. Please try again.",
              "error"
            );


            return;

          }


          // ========================================
          // PAYMENT ABANDONED
          // ========================================

          if (
            paymentStatus ===
            "abandoned"
          ) {

            console.log(
              "PAYSTACK PAYMENT ABANDONED:",
              reference
            );


            setStatus(
              "cancelled"
            );


            showToast(
              "Payment was cancelled. Your order has not been paid.",
              "error"
            );


            return;

          }


          // ========================================
          // PAYMENT NOT SUCCESSFUL YET
          // ========================================

          if (
            paymentStatus !==
            "success"
          ) {

            throw new Error(
              `Payment has not been completed. Current status: ${paymentStatus}`
            );

          }


          // ========================================
          // GET PENDING ORDER
          // ========================================

          const savedOrder =
            localStorage.getItem(
              "pendingOrder"
            );


          if (!savedOrder) {

            throw new Error(
              "Pending order information was not found."
            );

          }


          const pendingOrder =
            JSON.parse(
              savedOrder
            );


          console.log(
            "PENDING ORDER:",
            pendingOrder
          );


          // ========================================
          // GET ORDER ID
          // ========================================

          const orderId =
            pendingOrder.orderId;


          if (!orderId) {

            throw new Error(
              "Order ID was not found."
            );

          }


          // ========================================
          // GET EXISTING ORDER
          // ========================================

          const existingOrder =
            await getOrderById(
              orderId
            );


          console.log(
            "EXISTING ORDER:",
            existingOrder
          );


          if (
            !existingOrder ||
            !existingOrder._id
          ) {

            throw new Error(
              "Existing order could not be found."
            );

          }


          // ========================================
          // CHECK PAYMENT REFERENCE
          // ========================================

          if (
            existingOrder.paymentReference !==
            reference
          ) {

            throw new Error(
              "Payment reference does not match the order."
            );

          }


          // ========================================
          // CHECK ORDER PAYMENT STATUS
          // ========================================

          if (
            existingOrder.paymentStatus !==
            "Paid"
          ) {

            throw new Error(
              "Payment was verified, but the order was not marked as Paid."
            );

          }


          console.log(
            "ORDER PAYMENT VERIFIED:",
            existingOrder._id
          );


          // ========================================
          // SAVE COMPLETED PAYMENT
          // ========================================

          localStorage.setItem(

            "completedPayment",

            JSON.stringify({

              reference,

              orderId:
                existingOrder._id

            })

          );


          // ========================================
          // REMOVE PENDING ORDER
          // ========================================

          localStorage.removeItem(
            "pendingOrder"
          );


          // ========================================
          // CLEAR CART
          // ========================================

          localStorage.removeItem(
            "cart"
          );


          // ========================================
          // UPDATE CART COUNT
          // ========================================

          window.dispatchEvent(
            new Event(
              "cartUpdated"
            )
          );


          // ========================================
          // SHOW SUCCESS PAGE
          // ========================================

          setStatus(
            "success"
          );


          showToast(
            "Payment successful and order updated!",
            "success"
          );


          // ========================================
          // WAIT 3 SECONDS
          // THEN GO TO ORDER DETAILS
          // ========================================

          setTimeout(() => {

            navigate(
              `/account/orders/${existingOrder._id}`
            );

          }, 3000);


        } catch (error) {

          console.error(
            "PAYMENT PROCESSING ERROR:",
            error
          );


          setStatus(
            "failed"
          );


          showToast(
            error.message ||
              "Payment verification failed.",
            "error"
          );

        }

      };


    checkPayment();


  }, [
    searchParams,
    showToast,
    navigate
  ]);


  // ========================================
  // VERIFYING PAYMENT
  // ========================================

  if (
    status ===
    "verifying"
  ) {

    return (

      <>

        <Navbar
          products={
            searchProducts
          }
        />


        <main
          className="payment-callback-page"
        >

          <div
            className="payment-callback-container"
          >

            <div
              className="payment-callback-icon"
            >
              🔄
            </div>


            <h1>
              Verifying Payment
            </h1>


            <p>
              Please wait while we confirm
              your payment and update your order.
            </p>

          </div>

        </main>


        <Footer />

      </>

    );

  }


  // ========================================
  // PAYMENT SUCCESSFUL
  // ========================================

  if (
    status ===
    "success"
  ) {

    return (

      <>

        <Navbar
          products={
            searchProducts
          }
        />


        <main
          className="payment-callback-page"
        >

          <div
            className="payment-callback-container"
          >

            <div
              className="payment-callback-icon"
            >
              ✅
            </div>


            <h1>
              Payment Successful
            </h1>


            <p>
              Your payment has been successfully
              verified and your order has been updated.
            </p>


            <button
              className="payment-callback-btn"
              onClick={() =>
                navigate(
                  "/account/orders"
                )
              }
            >
              View My Orders
            </button>

          </div>

        </main>


        <Footer />

      </>

    );

  }


  // ========================================
  // PAYMENT CANCELLED
  // ========================================

  if (
    status ===
    "cancelled"
  ) {

    return (

      <>

        <Navbar
          products={
            searchProducts
          }
        />


        <main
          className="payment-callback-page"
        >

          <div
            className="payment-callback-container"
          >

            <div
              className="payment-callback-icon"
            >
              ⚠️
            </div>


            <h1>
              Payment Cancelled
            </h1>


            <p>
              Your payment was cancelled.
              Your order has not been paid.
            </p>


            <button
              className="payment-callback-btn"
              onClick={() =>
                navigate(
                  "/checkout"
                )
              }
            >
              Return to Checkout
            </button>

          </div>

        </main>


        <Footer />

      </>

    );

  }


  // ========================================
  // PAYMENT FAILED
  // ========================================

  return (

    <>

      <Navbar
        products={
          searchProducts
        }
      />


      <main
        className="payment-callback-page"
      >

        <div
          className="payment-callback-container"
        >

          <div
            className="payment-callback-icon"
          >
            ❌
          </div>


          <h1>
            Payment Failed
          </h1>


          <p>
            We were unable to confirm your payment.
          </p>


          <button
            className="payment-callback-btn"
            onClick={() =>
              navigate(
                "/checkout"
              )
            }
          >
            Return to Checkout
          </button>

        </div>

      </main>


      <Footer />

    </>

  );

}


export default PaymentCallback;