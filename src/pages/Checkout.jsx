import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import searchProducts from "../data/searchProducts";

import "../styles/checkout.css";
import { useToast } from "../context/ToastContext.jsx";

function Checkout() {

  const { showToast } = useToast();

  const [cart, setCart] = useState([]);

  const [paymentMethod, setPaymentMethod] =
    useState("");


  // ============================
  // LOAD CART
  // ============================

  useEffect(() => {

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);

  }, []);


  // ============================
  // PRICE CALCULATION
  // ============================

  const getPrice = (price) => {

    return Number(
      price.replace(/[₦,]/g, "")
    );

  };


  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      getPrice(item.price) *
        Number(item.quantity || 0),
    0
  );


  // ============================
  // FORM STATE
  // ============================

  const [formData, setFormData] = useState({

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

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  // ============================
  // DELIVERY METHOD
  // ============================

  const [deliveryMethod, setDeliveryMethod] =
    useState("");


  const deliveryOptions = {

    standard: {
      name: "Standard Delivery",
      price: 2000,
    },

    express: {
      name: "Express Delivery",
      price: 5000,
    },

    pickup: {
      name: "Pickup Station",
      price: 1000,
    },

  };


  const deliveryFee =

    deliveryMethod === "standard"
      ? 2000

      : deliveryMethod === "express"
      ? 5000

      : deliveryMethod === "pickup"
      ? 1000

      : 0;


  const total =
    subtotal + deliveryFee;


  const formatPrice = (price) => {

    return `₦${price.toLocaleString()}`;

  };


  return (
    <>

      <Navbar products={searchProducts} />


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

              <span>/</span>

              <Link to="/cart">
                Cart
              </Link>

              <span>/</span>

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


                  <form className="checkout-form">


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
                          value={formData.firstName}
                          onChange={handleChange}
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
                          value={formData.lastName}
                          onChange={handleChange}
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
                          value={formData.email}
                          onChange={handleChange}
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
                          value={formData.phone}
                          onChange={handleChange}
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
                        value={formData.address}
                        onChange={handleChange}
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
                          value={formData.city}
                          onChange={handleChange}
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
                          value={formData.state}
                          onChange={handleChange}
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
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="Postal code"
                          required
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
                            deliveryMethod === "standard"
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setDeliveryMethod("standard")
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
                            deliveryMethod === "express"
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setDeliveryMethod("express")
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
                            deliveryMethod === "pickup"
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setDeliveryMethod("pickup")
                          }
                        >

                          <div>

                            <strong>
                              Pickup Station
                            </strong>

                            <p>
                              ₦1,000
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
                            paymentMethod === "card"
                              ? "payment-option-active"
                              : ""
                          }`}
                        >

                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={
                              paymentMethod === "card"
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
                            paymentMethod === "bank"
                              ? "payment-option-active"
                              : ""
                          }`}
                        >

                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bank"
                            checked={
                              paymentMethod === "bank"
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
                            paymentMethod === "ussd"
                              ? "payment-option-active"
                              : ""
                          }`}
                        >

                          <input
                            type="radio"
                            name="paymentMethod"
                            value="ussd"
                            checked={
                              paymentMethod === "ussd"
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


                      {/* ONLY PAYMENT BUTTON */}

                      <button
                        type="button"
                        className="secure-payment-btn"
                        onClick={() => {

                          /* ============================
                             CHECK BILLING INFORMATION
                          ============================ */

                          if (
                            !formData.firstName.trim() ||
                            !formData.lastName.trim() ||
                            !formData.email.trim() ||
                            !formData.phone.trim() ||
                            !formData.address.trim() ||
                            !formData.city.trim() ||
                            !formData.state.trim() ||
                            !formData.postalCode.trim()
                          ) {

                            showToast(
                              "Please fill in all your billing and shipping information.",
                              "error"
                            );

                            return;
                          }


                          /* ============================
                             CHECK DELIVERY METHOD
                          ============================ */

                          if (!deliveryMethod) {

                            showToast(
                              "Please select a delivery method before continuing.",
                              "error"
                            );

                            return;
                          }


                          /* ============================
                             CHECK PAYMENT METHOD
                          ============================ */

                          if (!paymentMethod) {

                            showToast(
                              "Please select a payment method before continuing.",
                              "error"
                            );

                            return;
                          }


                          // Payment functionality will be added later.

                        }}
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
                            getPrice(item.price) *
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
                      {formatPrice(subtotal)}
                    </strong>

                  </div>


                  <div className="checkout-summary-row">

                    <span>
                      Delivery
                    </span>

                    <strong>
                      {formatPrice(deliveryFee)}
                    </strong>

                  </div>


                  <div className="checkout-summary-total">

                    <span>
                      Total
                    </span>

                    <strong>
                      {formatPrice(total)}
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