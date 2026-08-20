import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../api/productApi";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ProductCard from "../components/products/ProductCard";

import Toast from "../components/ui/Toast";
import ScrollReveal from "../components/ui/ScrollReveal";

import "../styles/shop.css";

import shopHero from "../assets/images/shop-hero.jpg";


function Shop() {

  // ============================
  // PRODUCTS FROM BACKEND
  // ============================

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const loadProducts = async () => {

      try {

        const data = await getProducts();

        console.log("BACKEND PRODUCTS:", data);

        setProducts(data);

      } catch (error) {

        console.error("PRODUCT ERROR:", error);

      }

    };

    loadProducts();

  }, []);


  // ============================
  // SEARCH
  // ============================

  const [search, setSearch] = useState("");


  // ============================
  // CATEGORY
  // ============================

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


  // ============================
  // FILTER PRODUCTS
  // ============================

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


  // ============================
  // TOAST
  // ============================

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


  // ============================
  // DEBUG
  // ============================

  console.log("SHOP PRODUCTS:", products);
  console.log("SHOP PRODUCT COUNT:", products.length);


  // ============================
  // PAGE
  // ============================

  return (

    <>

      <Navbar products={products} />


      <main className="shop-page">


        {/* ============================
            SHOP HERO
        ============================ */}

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

              <h1>Shop</h1>

              <p>
                Discover our premium collection of fashion essentials.
              </p>


              {/* ============================
                  BREADCRUMBS
              ============================ */}

              <div className="breadcrumbs">

                <a href="/">Home</a>

                <span>/</span>

                <span className="current">
                  Shop
                </span>

              </div>

            </div>

          </ScrollReveal>

        </section>


        {/* ============================
            TOAST
        ============================ */}

        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
        />


        {/* ============================
            SHOP PRODUCTS
        ============================ */}

        <section className="shop-products">

          <div className="container">


            {/* ============================
                TOOLBAR
            ============================ */}

            <ScrollReveal>

              <div className="shop-toolbar">


                {/* SEARCH */}

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


                {/* CATEGORY */}

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


            {/* ============================
                PRODUCTS
            ============================ */}

            <div className="products-grid">

              {filteredProducts.length > 0 ? (

                filteredProducts.map((product) => (

                  <ScrollReveal key={product._id}>

                    <ProductCard
                      id={product._id}
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

                        setSearchParams({});

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