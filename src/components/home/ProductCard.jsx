import "../../styles/featured.css";

import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

function ProductCard({
  image,
  category,
  title,
  price,
  badge,
  rating,
}) {
  return (
    <div className="product-card">

      <div className="product-image">

        <img src={image} alt={title} />

        <span className="badge">{badge}</span>

      </div>

      <div className="product-info">

        <p className="category">{category}</p>

        <h3>{title}</h3>

        <div className="rating">

          {[...Array(5)].map((_, index) =>
            index < rating ? (
              <FaStar key={index} />
            ) : (
              <FaRegStar key={index} />
            )
          )}

        </div>

        <div className="price-row">
          <span className="price">{price}</span>
        </div>

        <div className="product-buttons">

          <button className="wishlist-btn">
            <FaHeart />
          </button>

          <button className="cart-btn">
            <FaShoppingCart />
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;