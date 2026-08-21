import {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import PaystackPop from "@paystack/inline-js";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import searchProducts from "../data/searchProducts";

import "../styles/checkout.css";

import { useToast } from "../context/ToastContext.jsx";

import { initializePayment } from "../api/paymentApi";
import { createOrder } from "../api/orderApi";
import { verifyPayment } from "../api/paymentApi";

import { useAuth } from "../context/AuthContext";


function Checkout() {

  const navigate = useNavigate();

  const { isAuthenticated } =
    useAuth();

  const { showToast } =
    useToast();


  const [cart, setCart] =
    useState([]);


  const [paymentMethod, setPaymentMethod] =
    useState("");


  // ============================
  // LOAD CART
  // ============================

  useEffect(() => {

    const savedCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCart(savedCart);

  }, []);


  // ============================
  // PRICE CALCULATION
  // ============================

  const getPrice = (price) => {

    if (
      typeof price ===
      "number"
    ) {

      return price;

    }

    return Number(
      String(price)
        .replace(/[₦,]/g, "")
    );

  };


  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum +
        getPrice(item.price) *
          Number(
            item.quantity || 0
          ),
      0
    );


  // ============================
  // FORM STATE
  // ============================

  const [formData, setFormData] =
    useState({

      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",

    });


  // ============================
  // HANDLE INPUT
  // ============================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData({

      ...formData,

      [name]:
        value,

    });

  };


  // ============================
  // DELIVERY METHOD
  // ============================

  const [deliveryMethod, setDeliveryMethod] =
    useState("");


  const deliveryOptions = {

    standard: {

      name:
        "Standard Delivery",

      price:
        2000,

    },

    express: {

      name:
        "Express Delivery",

      price:
        5000,

    },

    pickup: {

      name:
        "Pickup Station",

      price:
        50,

    },

  };


  const deliveryFee =
    deliveryMethod === "standard"
      ? 2000
      : deliveryMethod === "express"
        ? 5000
        : deliveryMethod === "pickup"
          ? 50
          : 0;


  const total =
    subtotal +
    deliveryFee;


  const formatPrice = (price) => {

    return `₦${price.toLocaleString()}`;

  };


  // ============================================================
  // HANDLE PAYSTACK POPUP CANCEL / CLOSE
  // ============================================================

  const handlePaystackCancel = async (
    paymentReference
  ) => {

    console.log(
      "PAYSTACK POPUP CLOSED"
    );


    console.log(
      "CHECKING PAYMENT STATUS:",
      paymentReference
    );


    try {

      // ========================================================
      // VERIFY THE TRANSACTION
      // ========================================================

      const result =
        await verifyPayment(
          paymentReference
        );


      console.log(
        "PAYSTACK STATUS AFTER POPUP CLOSED:",
        result
      );


      const paymentStatus =
        result?.data?.status;


      // ========================================================
      // DECLINED / FAILED PAYMENT
      // ========================================================

      if (
        paymentStatus ===
        "failed"
      ) {

        console.log(
          "PAYMENT WAS DECLINED / FAILED"
        );


        navigate(
          `/payment/callback?reference=${encodeURIComponent(
            paymentReference
          )}&status=failed`
        );


        return;

      }


      // ========================================================
      // ABANDONED PAYMENT
      // ========================================================

      if (
        paymentStatus ===
        "abandoned"
      ) {

        console.log(
          "PAYMENT WAS ABANDONED"
        );


        navigate(
          `/payment/callback?reference=${encodeURIComponent(
            paymentReference
          )}&status=cancelled`
        );


        return;

      }


      // ========================================================
      // PAYMENT SUCCESS
      // ========================================================

      if (
        paymentStatus ===
        "success"
      ) {

        console.log(
          "PAYMENT WAS ACTUALLY SUCCESSFUL"
        );


        navigate(
          `/payment/callback?reference=${encodeURIComponent(
            paymentReference
          )}`
        );


        return;

      }


      // ========================================================
      // PAYMENT WAS CLOSED BEFORE PAYSTACK HAD A FINAL STATUS
      // ========================================================

      console.log(
        "PAYMENT HAS NO FINAL STATUS"
      );


      navigate(
        `/payment/callback?reference=${encodeURIComponent(
          paymentReference
        )}&status=cancelled`
      );


    } catch (error) {

      console.error(
        "ERROR CHECKING PAYMENT AFTER POPUP CLOSED:",
        error
      );


      // ========================================================
      // IF WE CANNOT VERIFY AFTER CLOSE,
      // TREAT IT AS CANCELLED
      // ========================================================

      navigate(
        `/payment/callback?reference=${encodeURIComponent(
          paymentReference
        )}&status=cancelled`
      );

    }

  };


  // ============================================================
  // START PAYSTACK PAYMENT
  // ============================================================

  const handlePlaceOrder = async () => {

    console.log(
      "🔥 PLACE ORDER BUTTON WAS CLICKED"
    );


    // ============================================================
    // CHECK LOGIN
    // ============================================================

    if (!isAuthenticated) {

      showToast(
        "Please login before placing your order.",
        "error"
      );


      navigate(
        "/login",
        {
          state: {
            from:
              "/checkout",
          },
        }
      );


      return;

    }


    // ============================================================
    // CHECK BILLING INFORMATION
    // ============================================================

    if (

      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim()

    ) {

      showToast(
        "Please fill in all your billing and shipping information.",
        "error"
      );


      return;

    }


    // ============================================================
    // CHECK DELIVERY METHOD
    // ============================================================

    if (!deliveryMethod) {

      showToast(
        "Please select a delivery method before continuing.",
        "error"
      );


      return;

    }


    // ============================================================
    // CHECK PAYMENT METHOD
    // ============================================================

    if (!paymentMethod) {

      showToast(
        "Please select a payment method before continuing.",
        "error"
      );


      return;

    }


    try {

      // ============================================================
      // GENERATE PAYMENT REFERENCE
      // ============================================================

      const paymentReference =
        `VELMIRA-${Date.now()}-${Math.floor(
          Math.random() * 100000
        )}`;


      // ============================================================
      // PREPARE PENDING ORDER
      // ============================================================

      const pendingOrder = {

        customer: {

          name:
            `${formData.firstName} ${formData.lastName}`,

          email:
            formData.email,

          phone:
            formData.phone,

        },


        products:
          cart.map((item) => ({

            productId:
              item.id,

            quantity:
              Number(item.quantity),

            price:
              getPrice(item.price),

          })),


        delivery: {

          address:
            `${formData.address}, ${formData.city}, ${formData.state}, ${formData.postalCode}`,

          method:
            deliveryOptions[
              deliveryMethod
            ].name,

        },


        paymentMethod,

        paymentStatus:
          "Pending",

        paymentReference,

        total,

      };


      // ============================================================
      // CLEAR OLD COMPLETED PAYMENT
      // ============================================================

      localStorage.removeItem(
        "completedPayment"
      );


      // ============================================================
      // SAVE PENDING ORDER LOCALLY
      // ============================================================

      localStorage.setItem(

        "pendingOrder",

        JSON.stringify(
          pendingOrder
        )

      );


      // ============================================================
      // CREATE PENDING ORDER IN DATABASE
      // ============================================================

      console.log(
        "ORDER DATA BEING SENT TO BACKEND:",
        JSON.stringify(
          pendingOrder,
          null,
          2
        )
      );


      const order =
        await createOrder(
          pendingOrder
        );


      console.log(
        "PENDING ORDER CREATED:",
        order
      );


      // ============================================================
      // SAVE ORDER ID LOCALLY
      // ============================================================

      localStorage.setItem(

        "pendingOrder",

        JSON.stringify({

          ...pendingOrder,

          orderId:
            order._id,

        })

      );


      // ============================================================
      // INITIALIZE PAYSTACK FROM BACKEND
      // ============================================================

      console.log(
        "INITIALIZING PAYSTACK..."
      );


      const payment =
        await initializePayment({

          email:
            formData.email,

          amount:
            total,

          reference:
            paymentReference,

        });


      console.log(
        "PAYSTACK INITIALIZATION RESPONSE:",
        payment
      );


      // ============================================================
      // GET PAYSTACK ACCESS CODE
      // ============================================================

      const accessCode =
        payment?.data?.access_code;


      if (!accessCode) {

        throw new Error(
          "Paystack did not return an access code."
        );

      }


      console.log(
        "PAYSTACK ACCESS CODE:",
        accessCode
      );


      // ============================================================
      // OPEN PAYSTACK POPUP
      // ============================================================

window.location.href =
  payment.data.authorization_url;

      // ============================================================
      // NOTE:
      //
      // Paystack Popup V2 callbacks are attached
      // during transaction creation.
      //
      // Because we are resuming a transaction that
      // was initialized by our backend, the popup
      // handles the transaction using the access code.
      //
      // The final payment status is always checked
      // against Paystack from our backend.
      // ============================================================


    } catch (error) {

      console.error(
        "PAYMENT ERROR:",
        error
      );


      showToast(

        error.message ||
          "Unable to start payment.",

        "error"

      );

    }

  };


  return (

    <>

      <Navbar
        products={
          searchProducts
        }
      />


      <main className="checkout-page">


        {/* ==================== CHECKOUT HERO ==================== */}

        <section className="checkout-header">

          <div className="container">

            <h1>
              Checkout
            </h1>

            <p>
              Complete your details to place your order.
            </p>


            <div className="breadcrumb">

              <Link to="/">
                Home
              </Link>

              <span>
                /
              </span>

              <Link to="/cart">
                Cart
              </Link>

              <span>
                /
              </span>

              <span>
                Checkout
              </span>

            </div>

          </div>

        </section>


        {/* ==================== CHECKOUT CONTENT ==================== */}

        <section className="checkout-section">

          <div className="container">

            {cart.length === 0 ? (

              /* ==================== EMPTY CART ==================== */

              <div className="empty-checkout">

                <div className="empty-checkout-icon">
                  🛒
                </div>

                <h2>
                  Your cart is empty
                </h2>

                <p>
                  Add some products before proceeding to checkout.
                </p>

                <Link
                  to="/shop"
                  className="checkout-shop-btn"
                >
                  Continue Shopping
                </Link>

              </div>

            ) : (

              <div className="checkout-layout">


                {/* ==================== CUSTOMER INFORMATION ==================== */}

                <div className="checkout-form-container">

                  <div className="checkout-form-header">

                    <h2>
                      Billing & Shipping Information
                    </h2>

                    <p>
                      Please enter your details below.
                    </p>

                  </div>


                  <form
                    className="checkout-form"
                    onSubmit={(e) =>
                      e.preventDefault()
                    }
                  >


                    {/* NAME */}

                    <div className="form-row">

                      <div className="form-group">

                        <label htmlFor="firstName">
                          First Name
                        </label>

                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={
                            formData.firstName
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="Enter your first name"
                          required
                        />

                      </div>


                      <div className="form-group">

                        <label htmlFor="lastName">
                          Last Name
                        </label>

                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={
                            formData.lastName
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="Enter your last name"
                          required
                        />

                      </div>

                    </div>


                    {/* EMAIL + PHONE */}

                    <div className="form-row">

                      <div className="form-group">

                        <label htmlFor="email">
                          Email Address
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={
                            formData.email
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="you@example.com"
                          required
                        />

                      </div>


                      <div className="form-group">

                        <label htmlFor="phone">
                          Phone Number
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={
                            formData.phone
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="0800 000 0000"
                          required
                        />

                      </div>

                    </div>


                    {/* ADDRESS */}

                    <div className="form-group">

                      <label htmlFor="address">
                        Delivery Address
                      </label>

                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={
                          formData.address
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Enter your delivery address"
                        required
                      />

                    </div>


                    {/* CITY / STATE / POSTAL */}

                    <div className="form-row three-columns">

                      <div className="form-group">

                        <label htmlFor="city">
                          City
                        </label>

                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={
                            formData.city
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="City"
                          required
                        />

                      </div>


                      <div className="form-group">

                        <label htmlFor="state">
                          State
                        </label>

                        <input
                          id="state"
                          name="state"
                          type="text"
                          value={
                            formData.state
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="State"
                          required
                        />

                      </div>


                      <div className="form-group">

                        <label htmlFor="postalCode">
                          Postal Code
                        </label>

                        <input
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          value={
                            formData.postalCode
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="Postal code (optional)"
                        />

                      </div>

                    </div>


                    {/* ==================== DELIVERY METHOD ==================== */}

                    <div className="delivery-card">

                      <h2>
                        Delivery Method
                      </h2>


                      <div className="delivery-options">


                        <button
                          type="button"
                          className={`delivery-option ${
                            deliveryMethod ===
                            "standard"
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setDeliveryMethod(
                              "standard"
                            )
                          }
                        >

                          <div>

                            <strong>
                              Standard Delivery
                            </strong>

                            <p>
                              ₦2,000
                            </p>

                          </div>

                        </button>


                        <button
                          type="button"
                          className={`delivery-option ${
                            deliveryMethod ===
                            "express"
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setDeliveryMethod(
                              "express"
                            )
                          }
                        >

                          <div>

                            <strong>
                              Express Delivery
                            </strong>

                            <p>
                              ₦5,000
                            </p>

                          </div>

                        </button>


                        <button
                          type="button"
                          className={`delivery-option ${
                            deliveryMethod ===
                            "pickup"
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setDeliveryMethod(
                              "pickup"
                            )
                          }
                        >

                          <div>

                            <strong>
                              Pickup Station
                            </strong>

                            <p>
                              ₦50
                            </p>

                          </div>

                        </button>

                      </div>

                    </div>


                    {/* ==================== PAYMENT METHOD ==================== */}

                    <div className="payment-card">

                      <div className="payment-header">

                        <h2>
                          Select Payment Method
                        </h2>

                        <p>
                          Choose your preferred payment method.
                        </p>

                      </div>


                      <div className="payment-options">


                        {/* CREDIT / DEBIT CARD */}

                        <label
                          className={`payment-option ${
                            paymentMethod ===
                            "card"
                              ? "payment-option-active"
                              : ""
                          }`}
                        >

                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={
                              paymentMethod ===
                              "card"
                            }
                            onChange={(e) =>
                              setPaymentMethod(
                                e.target.value
                              )
                            }
                          />

                          <div className="payment-option-content">

                            <strong>
                              Credit/Debit Card
                            </strong>

                            <span>
                              Pay with Visa, Mastercard, or Verve
                            </span>

                          </div>

                        </label>


                        {/* BANK TRANSFER */}

                        <label
                          className={`payment-option ${
                            paymentMethod ===
                            "bank"
                              ? "payment-option-active"
                              : ""
                          }`}
                        >

                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bank"
                            checked={
                              paymentMethod ===
                              "bank"
                            }
                            onChange={(e) =>
                              setPaymentMethod(
                                e.target.value
                              )
                            }
                          />

                          <div className="payment-option-content">

                            <strong>
                              Bank Transfer
                            </strong>

                            <span>
                              Pay directly from your bank account
                            </span>

                          </div>

                        </label>


                        {/* USSD */}

                        <label
                          className={`payment-option ${
                            paymentMethod ===
                            "ussd"
                              ? "payment-option-active"
                              : ""
                          }`}
                        >

                          <input
                            type="radio"
                            name="paymentMethod"
                            value="ussd"
                            checked={
                              paymentMethod ===
                              "ussd"
                            }
                            onChange={(e) =>
                              setPaymentMethod(
                                e.target.value
                              )
                            }
                          />

                          <div className="payment-option-content">

                            <strong>
                              USSD
                            </strong>

                            <span>
                              Pay with your bank USSD code
                            </span>

                          </div>

                        </label>

                      </div>


                      {/* PAYMENT INFORMATION */}

                      <div className="payment-information">

                        <p>
                          When you click "Continue to Secure Payment",
                          you'll be redirected to our secure payment
                          processor to complete your payment.
                        </p>

                      </div>


                      {/* PAYMENT BUTTON */}

                      <button
                        type="button"
                        className="secure-payment-btn"
                        onClick={
                          handlePlaceOrder
                        }
                      >
                        Continue to Secure Payment
                      </button>


                      <div className="paystack-secure">
                        🔒 Secured by Paystack
                      </div>

                    </div>

                  </form>

                </div>


                {/* ==================== ORDER SUMMARY ==================== */}

                <aside className="checkout-summary">

                  <h2>
                    Your Order
                  </h2>


                  {/* PRODUCTS */}

                  <div className="checkout-products">

                    {cart.map((item) => (

                      <div
                        className="checkout-product"
                        key={item.id}
                      >

                        <div className="checkout-product-image">

                          <img
                            src={item.image}
                            alt={item.name}
                          />

                          <span>
                            {item.quantity}
                          </span>

                        </div>


                        <div className="checkout-product-info">

                          <h3>
                            {item.name}
                          </h3>

                          <p>
                            {item.category}
                          </p>

                        </div>


                        <strong>
                          {formatPrice(
                            getPrice(
                              item.price
                            ) *
                              item.quantity
                          )}
                        </strong>

                      </div>

                    ))}

                  </div>


                  {/* TOTALS */}

                  <div className="checkout-summary-row">

                    <span>
                      Subtotal
                    </span>

                    <strong>
                      {formatPrice(
                        subtotal
                      )}
                    </strong>

                  </div>


                  <div className="checkout-summary-row">

                    <span>
                      Delivery
                    </span>

                    <strong>
                      {formatPrice(
                        deliveryFee
                      )}
                    </strong>

                  </div>


                  <div className="checkout-summary-total">

                    <span>
                      Total
                    </span>

                    <strong>
                      {formatPrice(
                        total
                      )}
                    </strong>

                  </div>


                  <Link
                    to="/cart"
                    className="back-to-cart"
                  >
                    ← Back to Cart
                  </Link>

                </aside>

              </div>

            )}

          </div>

        </section>

      </main>


      <Footer />

    </>

  );

}


export default Checkout;