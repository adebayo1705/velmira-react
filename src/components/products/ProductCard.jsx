import "../../styles/featured.css";

import { useToast } from "../../context/ToastContext";

import { getProductImage } from "../../utils/productImages";

import { FaHeart, FaCartShopping, FaStar } from "react-icons/fa6";

function ProductCard({ id, image, name, category, price, badge, rating }) {
  const { showToast } = useToast();

  // ============================
  // ADD TO CART
  // ============================

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      category,
      price,
      image,
      badge,
      rating,
      quantity: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find((item) => item.id === id);

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(item.quantity || 0) + 1,
            }
          : item,
      );

      showToast(`${name} quantity increased in cart`, "success");
    } else {
      updatedCart = [...existingCart, product];

      showToast(`${name} added to cart`, "success");
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ============================
  // ADD TO WISHLIST
  // ============================

  const handleWishlist = () => {
    const product = {
      id,
      name,
      category,
      price,
      image,
      badge,
      rating,
    };

    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = existingWishlist.some((item) => item.id === id);

    if (alreadyExists) {
      showToast(`${name} is already in your wishlist`, "error");

      return;
    }

    const updatedWishlist = [...existingWishlist, product];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    showToast(`${name} added to wishlist`, "success");
  };

  return (
    <div className="product-card">
      {/* ==================== PRODUCT IMAGE ==================== */}

      <div className="product-image">
        <img src={getProductImage(image)} alt={name} />

        {badge && <span className="badge">{badge}</span>}
      </div>

      {/* ==================== PRODUCT INFO ==================== */}

      <div className="product-info">
        <p className="category">{category}</p>

        <h3>{name}</h3>

        {/* ==================== RATING ==================== */}

        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={star <= rating ? "star-filled" : "star-empty"}
            />
          ))}
        </div>

        {/* ==================== PRICE ==================== */}

        <div className="price-row">
          <span className="price">{price}</span>
        </div>

        {/* ==================== BUTTONS ==================== */}

        <div className="product-buttons">
          {/* Wishlist */}

          <button
            type="button"
            className="wishlist-btn"
            onClick={handleWishlist}
            aria-label={`Add ${name} to wishlist`}
          >
            <FaHeart />
          </button>

          {/* Cart */}

          <button type="button" className="cart-btn" onClick={handleAddToCart}>
            <FaCartShopping />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
