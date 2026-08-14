import "../../styles/featured.css";

import ProductCard from "../products/ProductCard";

import bag from "../../assets/images/products/bag1.jpg";
import watch from "../../assets/images/products/watch1.jpg";
import perfume from "../../assets/images/products/perfume1.jpg";
import jewelry from "../../assets/images/products/jewelry1.jpg";


function FeaturedProducts() {

  const products = [

    {
      id: 3,
      name: "Luxury Handbag",
      category: "Bags",
      price: "₦35,000",
      image: bag,
      badge: "New",
      rating: 5,
    },

    {
      id: 7,
      name: "Luxury Wristwatch",
      category: "Watches",
      price: "₦28,000",
      image: watch,
      badge: "Sale",
      rating: 4,
    },

    {
      id: 11,
      name: "Luxury Perfume",
      category: "Perfumes",
      price: "₦18,500",
      image: perfume,
      badge: "Hot",
      rating: 4,
    },

    {
      id: 5,
      name: "Gold Necklace",
      category: "Jewelry",
      price: "₦25,000",
      image: jewelry,
      badge: "Popular",
      rating: 5,
    },

  ];


  return (

    <section className="featured-products">

      <div className="container">

        <div className="section-title">

          <h2>
            Featured Products
          </h2>

          <p>
            Discover our best-selling fashion essentials.
          </p>

        </div>


        <div className="products-grid">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              category={product.category}
              price={product.price}
              badge={product.badge}
              rating={product.rating}
            />

          ))}

        </div>

      </div>

    </section>

  );
}

export default FeaturedProducts;