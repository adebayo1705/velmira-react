import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import searchProducts from "../data/searchProducts";
import ScrollReveal from "../components/ui/ScrollReveal";

import "../styles/wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // ============================
  // LOAD WISHLIST
  // ============================

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  // ============================
  // UPDATE WISHLIST
  // ============================

  const updateWishlist = (updatedWishlist) => {
    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  // ============================
  // REMOVE FROM WISHLIST
  // ============================

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    updateWishlist(updatedWishlist);
  };

  // ============================
  // CLEAR WISHLIST
  // ============================

  const clearWishlist = () => {
    updateWishlist([]);
  };

  // ============================
  // ADD TO CART
  // ============================

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: Number(item.quantity || 0) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // Update Navbar cart count
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert(`${product.name} added to cart 🛒`);
  };

  return (
    <>
      <Navbar products={searchProducts} />

<main className="wishlist-page">

  {/* ==================== WISHLIST HERO ==================== */}

  <section className="wishlist-header">

    <ScrollReveal>

      <div className="container">

        <h1>
          My Wishlist
        </h1>

        <p>
          Save your favorite pieces and shop them whenever you're ready.
        </p>

        <div className="breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <span>
            Wishlist
          </span>

        </div>

      </div>

    </ScrollReveal>

  </section>


  {/* ==================== WISHLIST CONTENT ==================== */}

  <section className="wishlist-section">

    <div className="container">

      {wishlist.length === 0 ? (

        /* ==================== EMPTY WISHLIST ==================== */

        <ScrollReveal>

          <div className="empty-wishlist">

            <div className="empty-wishlist-icon">
              ❤️
            </div>

            <h2>
              Your wishlist is empty
            </h2>

            <p>
              You haven't saved any products yet.
            </p>

            <Link
              to="/shop"
              className="continue-shopping"
            >
              Explore Collection
            </Link>

          </div>

        </ScrollReveal>

      ) : (

        /* ==================== WISHLIST PRODUCTS ==================== */

        <div className="wishlist-grid">

          {/* ==================== CLEAR WISHLIST ==================== */}

          <ScrollReveal>

            <button
              type="button"
              className="clear-wishlist-button"
              onClick={clearWishlist}
            >
              Clear Wishlist
            </button>

          </ScrollReveal>


          {wishlist.map((item) => (

            <ScrollReveal key={item.id}>

              <div
                className="wishlist-card"
                key={item.id}
              >

                {/* IMAGE */}

                <div className="wishlist-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  {item.badge && (
                    <span className="wishlist-badge">
                      {item.badge}
                    </span>
                  )}

                </div>


                {/* PRODUCT INFO */}

                <div className="wishlist-info">

                  <p className="wishlist-category">
                    {item.category}
                  </p>

                  <h3>
                    {item.name}
                  </h3>

                  <p className="wishlist-price">
                    {item.price}
                  </p>


                  {/* BUTTONS */}

                  <div className="wishlist-buttons">

                    <button
                      type="button"
                      className="wishlist-cart-btn"
                      onClick={() =>
                        addToCart(item)
                      }
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="wishlist-remove-btn"
                      onClick={() =>
                        removeFromWishlist(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            </ScrollReveal>

          ))}

        </div>

      )}

    </div>

  </section>

</main>

      <Footer />
    </>
  );
}

export default Wishlist;