import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import searchProducts from "../data/searchProducts";
import ScrollReveal from "../components/ui/ScrollReveal";

import "../styles/cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  // ============================
  // LOAD CART
  // ============================

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  // ============================
  // UPDATE LOCAL STORAGE
  // ============================

  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // Update Navbar cart count
    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };


  // ============================
  // UPDATE QUANTITY
  // ============================

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: quantity,
          }
        : item
    );

    updateCart(updatedCart);
  };


  // ============================
  // REMOVE PRODUCT
  // ============================

  const removeProduct = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };


  // ============================
  // CLEAR CART
  // ============================

  const clearCart = () => {
    updateCart([]);
  };


  // ============================
  // PRICE CALCULATION
  // ============================

  const getPrice = (price) => {
    return Number(
      price.replace(/[₦,]/g, "")
    );
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      getPrice(item.price) * item.quantity,
    0
  );

  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <>
      <Navbar products={searchProducts} />

<main className="cart-page">

  {/* ==================== CART HEADER ==================== */}

  <section className="cart-header">

    <ScrollReveal>

      <div className="container">

        <h1>
          Your Shopping Cart
        </h1>

        <p>
          Review your selected products before checkout.
        </p>

        <div className="breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <span>
            Cart
          </span>

        </div>

      </div>

    </ScrollReveal>

  </section>


  {/* ==================== CART CONTENT ==================== */}

  <section className="cart-section">

    <div className="container">

      {cart.length === 0 ? (

        /* ==================== EMPTY CART ==================== */

        <ScrollReveal>

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              You haven't added any products to your cart yet.
            </p>

            <a
              href="/shop"
              className="continue-shopping"
            >
              Continue Shopping
            </a>

          </div>

        </ScrollReveal>

      ) : (

        /* ==================== CART ==================== */

        <div className="cart-layout">

          {/* ==================== PRODUCTS ==================== */}

          <div className="cart-items">

            {/* ==================== CLEAR CART ==================== */}

            <ScrollReveal>

              <button
                type="button"
                className="clear-cart-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>

            </ScrollReveal>


            {cart.map((item) => (

              <ScrollReveal key={item.id}>

                <div
                  className="cart-item"
                  key={item.id}
                >

                  {/* Product Image */}

                  <div className="cart-item-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>


                  {/* Product Information */}

                  <div className="cart-item-info">

                    <p className="cart-category">
                      {item.category}
                    </p>

                    <h3>
                      {item.name}
                    </h3>

                    <p className="cart-price">
                      {item.price}
                    </p>


                    {/* Quantity */}

                    <div className="quantity-controls">

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {

                          const value = e.target.value;

                          if (value === "") {
                            return;
                          }

                          const quantity = Number(value);

                          if (quantity >= 1) {

                            updateQuantity(
                              item.id,
                              quantity
                            );

                          }

                        }}
                      />

                    </div>

                  </div>


                  {/* Remove */}

                  <button
                    type="button"
                    className="remove-cart-item"
                    onClick={() =>
                      removeProduct(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </ScrollReveal>

            ))}

          </div>


          {/* ==================== SUMMARY ==================== */}

          <ScrollReveal className="scroll-reveal-right">

            <aside className="cart-summary">

              <h2>
                Cart Summary
              </h2>

              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  {formatPrice(total)}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Delivery
                </span>

                <span>
                  Calculated at checkout
                </span>

              </div>

              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  {formatPrice(total)}
                </strong>

              </div>

              <Link
                to="/checkout"
                className="checkout-btn"
              >
                Proceed to Checkout
              </Link>

              <a
                href="/shop"
                className="continue-shopping-link"
              >
                Continue Shopping
              </a>

            </aside>

          </ScrollReveal>

        </div>

      )}

    </div>

  </section>

</main>

      <Footer />
    </>
  );
}

export default Cart;