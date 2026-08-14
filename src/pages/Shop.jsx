import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ProductCard from "../components/products/ProductCard";
import "../styles/shop.css";
import Toast from "../components/ui/Toast";
import ScrollReveal from "../components/ui/ScrollReveal";

import shopHero from "../assets/images/shop-hero.jpg";

import bag1 from "../assets/images/products/bag1.jpg";
import bag2 from "../assets/images/products/bag2.jpg";

import hair1 from "../assets/images/products/hair1.jpg";
import hair2 from "../assets/images/products/hair2.jpg";
import hair3 from "../assets/images/products/hair3.jpg";


import jewelry1 from "../assets/images/products/jewelry1.jpg";
import jewelry2 from "../assets/images/products/jewelry2.jpg";

import watch1 from "../assets/images/products/watch1.jpg";
import watch2 from "../assets/images/products/watch2.jpg";

import perfume1 from "../assets/images/products/perfume1.jpg";
import perfume2 from "../assets/images/products/perfume2.jpg";

import clothing1 from "../assets/images/products/clothing1.jpg";
import clothing2 from "../assets/images/products/clothing2.jpg";

function Shop() {

const products = [

  {
    id: 1,
    name: "Curly wig",
    category: "Hair",
    price: "₦85,000",
    image: hair1,
    badge: "New",
    rating: 5,
  },

  {
    id: 2,
    name: "Straight wig",
    category: "Hair",
    price: "₦78,000",
    image: hair2,
    badge: "Hot",
    rating: 4,
  },

  {
    id: 3,
    name: "Luxury Handbag",
    category: "Bags",
    price: "₦35,000",
    image: bag1,
    badge: "New",
    rating: 5,
  },

  {
    id: 4,
    name: "Leather Tote Bag",
    category: "Bags",
    price: "₦42,000",
    image: bag2,
    badge: "Sale",
    rating: 4,
  },

  {
    id: 5,
    name: "Gold Necklace",
    category: "Jewelry",
    price: "₦25,000",
    image: jewelry1,
    badge: "Popular",
    rating: 5,
  },

  {
    id: 6,
    name: "Diamond Earrings",
    category: "Jewelry",
    price: "₦22,000",
    image: jewelry2,
    badge: "New",
    rating: 4,
  },

  {
    id: 7,
    name: "Luxury Wristwatch",
    category: "Watches",
    price: "₦28,000",
    image: watch1,
    badge: "Sale",
    rating: 4,
  },

  {
    id: 8,
    name: "Leather Watch",
    category: "Watches",
    price: "₦32,000",
    image: watch2,
    badge: "Hot",
    rating: 5,
  },

  {
    id: 9,
    name: "Premium Hoodie",
    category: "Clothing",
    price: "₦18,000",
    image: clothing1,
    badge: "New",
    rating: 4,
  },

  {
    id: 10,
    name: "Elegant Dress",
    category: "Clothing",
    price: "₦30,000",
    image: clothing2,
    badge: "Popular",
    rating: 5,
  },

  {
    id: 11,
    name: "Luxury Perfume",
    category: "Perfumes",
    price: "₦18,500",
    image: perfume1,
    badge: "Hot",
    rating: 4,
  },

  {
    id: 12,
    name: "Classic Perfume",
    category: "Perfumes",
    price: "₦21,000",
    image: perfume2,
    badge: "Sale",
    rating: 5,
  },

    {
    id: 13,
    name: "Luxury Wig",
    category: "Hair",
    price: "₦7,000",
    image: hair3,
    badge: "Hot",
    rating: 2,
  },

];

  const [search, setSearch] = useState("");

const [searchParams, setSearchParams] = useSearchParams();

const [category, setCategory] = useState(
  searchParams.get("category")?.toLowerCase() || "all"
);

useEffect(() => {
  const urlCategory = searchParams.get("category");

  if (urlCategory) {
    setCategory(urlCategory.toLowerCase());
  } else {
    setCategory("all");
  }
}, [searchParams]);


const filteredProducts = products.filter((product) => {

  const searchText = search.toLowerCase().trim();

  const matchesSearch =
    product.name.toLowerCase().includes(searchText) ||
    product.category.toLowerCase().includes(searchText);

  const matchesCategory =
    category === "all" ||
    product.category.toLowerCase() === category;

  return matchesSearch && matchesCategory;

});

const [toast, setToast] = useState({
  visible: false,
  message: "",
  type: "success",
});

const showToast = (message, type = "success") => {

  setToast({
    visible: true,
    message,
    type,
  });

  setTimeout(() => {

    setToast({
      visible: false,
      message: "",
      type: "success",
    });

  }, 3000);
};

useEffect(() => {
  const handleToast = (event) => {
    showToast(
      event.detail.message,
      event.detail.type || "success"
    );
  };

  window.addEventListener("showToast", handleToast);

  return () => {
    window.removeEventListener("showToast", handleToast);
  };
}, []);

console.log("SHOP PRODUCTS:", products);
console.log("SHOP PRODUCT COUNT:", products.length);

return (
  <>
    <Navbar products={products} />

<main className="shop-page">

  {/* ==================== SHOP HERO ==================== */}

  <section
    className="shop-header"
    style={{
      backgroundImage: `
        linear-gradient(
          rgba(0, 0, 0, 0.45),
          rgba(0, 0, 0, 0.45)
        ),
        url(${shopHero})
      `,
    }}
  >

    <ScrollReveal>

      <div className="container">

        <h1>
          Shop
        </h1>

        <p>
          Discover our premium collection of fashion essentials.
        </p>

        {/* ==================== BREADCRUMBS ==================== */}

        <div className="breadcrumbs">

          <a href="/">
            Home
          </a>

          <span>/</span>

          <span className="current">
            Shop
          </span>

        </div>

      </div>

    </ScrollReveal>

  </section>


  <Toast
    visible={toast.visible}
    message={toast.message}
    type={toast.type}
  />


  {/* ==================== SHOP PRODUCTS ==================== */}

  <section className="shop-products">

    <div className="container">


      {/* ==================== TOOLBAR ==================== */}

      <ScrollReveal>

        <div className="shop-toolbar">


          {/* Search */}

          <div className="shop-search">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

          </div>


          {/* Category */}

          <select
            value={category}
            onChange={(e) => {
              const value = e.target.value;

              setCategory(value);

              if (value === "all") {

                setSearchParams({});

              } else {

                setSearchParams({
                  category: value,
                });

              }
            }}
          >

            <option value="all">
              All Categories
            </option>

            <option value="bags">
              Bags
            </option>

            <option value="hair">
              Hair
            </option>

            <option value="jewelry">
              Jewelry
            </option>

            <option value="watches">
              Watches
            </option>

            <option value="clothing">
              Clothing
            </option>

            <option value="perfumes">
              Perfumes
            </option>

          </select>

        </div>

      </ScrollReveal>


      {/* ==================== PRODUCTS ==================== */}

      <div className="products-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (

            <ScrollReveal key={product.id}>

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

            </ScrollReveal>

          ))

        ) : (

          <ScrollReveal>

            <div className="no-products">

              <h3>
                No Products Found
              </h3>

              <p>
                We couldn't find any products matching your search.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
              >
                Continue Shopping
              </button>

            </div>

          </ScrollReveal>

        )}

      </div>


    </div>

  </section>


</main>

      <Footer />

    </>

  );
}


export default Shop;