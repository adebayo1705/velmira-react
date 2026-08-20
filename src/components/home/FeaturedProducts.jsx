import { useEffect, useState } from "react";

import "../../styles/featured.css";

import ProductCard from "../products/ProductCard";

import { getProducts } from "../../api/productApi";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  // ============================
  // LOAD PRODUCTS FROM BACKEND
  // ============================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        console.log("FEATURED PRODUCTS:", data);

        setProducts(data);
      } catch (error) {
        console.error("FEATURED PRODUCT ERROR:", error);
      }
    };

    loadProducts();
  }, []);

  // ============================
  // FEATURED PRODUCT IDS
  // ============================

  const featuredIds = [
    "6a84c1e8247a4eee48357054",
    "6a84c1e8247a4eee48357058",
    "6a84c1e9247a4eee4835705c",
    "6a84c1e8247a4eee48357056",
  ];

  const featuredProducts = products.filter((product) =>
    featuredIds.includes(product._id)
  );

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

          {featuredProducts.map((product) => (

            <ProductCard
              key={product._id}
              id={product._id}
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