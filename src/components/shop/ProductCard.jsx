import "../../styles/featured.css";

import {
  FaHeart,
  FaCartShopping,
  FaStar,
} from "react-icons/fa6";

function ProductCard({
  id,
  image,
  name,
  category,
  price,
  badge,
  rating,
}) {

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

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item.id === id
    );

    let updatedCart;

    if (existingProduct) {

      updatedCart = existingCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

    } else {

      updatedCart = [
        ...existingCart,
        product,
      ];

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

window.dispatchEvent(
  new CustomEvent("showToast", {
    detail: {
      message: `${name} added to cart`,
      type: "success",
    },
  })
);window.dispatchEvent(
  new CustomEvent("showToast", {
    detail: {
      message: `${name} added to cart`,
      type: "success",
    },
  })
);


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

    const existingWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = existingWishlist.some(
      (item) => item.id === id
    );

    if (alreadyExists) {

      alert(`${name} is already in your wishlist ❤️`);

      return;
    }

    const updatedWishlist = [
      ...existingWishlist,
      product,
    ];

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    alert(`${name} added to wishlist ❤️`);
  };


  return (
    <div className="product-card">

      <div className="product-image">

        <img
          src={image}
          alt={name}
        />

        {badge && (
          <span className="badge">
            {badge}
          </span>
        )}

      </div>


      <div className="product-info">

        <p className="category">
          {category}
        </p>

        <h3>
          {name}
        </h3>


        <div className="rating">

          {[1, 2, 3, 4, 5].map((star) => (

            <FaStar
              key={star}
              className={
                star <= rating
                  ? "star-filled"
                  : "star-empty"
              }
            />

          ))}

        </div>


        <div className="price-row">

          <span className="price">
            {price}
          </span>

        </div>


        <div className="product-buttons">

          <button
            type="button"
            className="wishlist-btn"
            onClick={handleWishlist}
          >
            <FaHeart />
          </button>


          <button
            type="button"
            className="cart-btn"
            onClick={handleAddToCart}
          >
            <FaCartShopping />
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;}