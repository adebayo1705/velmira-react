import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import ProductCard from "../products/ProductCard";

import "../../styles/SearchOverlay.css";


function SearchOverlay({
  products = [],
  isOpen,
  onClose,
}) {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");


  // ============================
  // CLOSE SEARCH
  // ============================

  const handleClose = () => {

    setSearch("");

    onClose();

  };


  // ============================
  // ESC KEY
  // ============================

  useEffect(() => {

    const handleEscape = (e) => {

      if (e.key === "Escape") {
        handleClose();
      }

    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      document.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, []);


  // ============================
  // BODY SCROLL
  // ============================

  useEffect(() => {

    if (isOpen) {

      document.body.style.overflow = "hidden";

    } else {

      document.body.style.overflow = "";

    }

    return () => {

      document.body.style.overflow = "";

    };

  }, [isOpen]);


  // ============================
  // SEARCH
  // ============================

  const keyword =
    search.toLowerCase().trim();


  const filteredProducts =
    keyword === ""
      ? []
      : products.filter((product) => {

          const productName =
            product.name
              ?.toLowerCase()
              .trim();

          const productCategory =
            product.category
              ?.toLowerCase()
              .trim();

          return (
            productName?.includes(keyword) ||
            productCategory?.includes(keyword)
          );

        });


  // ============================
  // POPULAR SEARCH
  // ============================

  const handlePopularSearch = (searchTerm) => {

    setSearch(searchTerm);

  };


  // ============================
  // PRODUCT CLICK
  // ============================

  const handleProductClick = (product) => {

    localStorage.setItem(
      "searchKeyword",
      product.name
    );

    handleClose();

    navigate("/shop");

  };


  // ============================
  // PAGE
  // ============================

  return (

    <div
      className={`search-overlay ${
        isOpen ? "active" : ""
      }`}
      onClick={(e) => {

        if (
          e.target === e.currentTarget
        ) {

          handleClose();

        }

      }}
    >

      <div className="search-overlay-content">


        {/* ============================
            CLOSE
        ============================ */}

        <button
          type="button"
          className="close-search"
          onClick={handleClose}
          aria-label="Close search"
        >

          <FaTimes />

        </button>


        {/* ============================
            HEADING
        ============================ */}

        <h2>
          Search Velmira
        </h2>

        <p>
          Find luxury bags, watches, jewelry,
          perfumes and more.
        </p>


        {/* ============================
            SEARCH BOX
        ============================ */}

        <div className="overlay-search-box">

          <FaSearch />

          <input
            type="text"
            id="overlaySearchInput"
            name="search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search products..."
            autoComplete="off"
            autoFocus={isOpen}
          />

        </div>


        {/* ============================
            RESULTS
        ============================ */}

        {keyword !== "" && (

          <div id="resultsSection">

            <h3>
              Results
            </h3>


            {filteredProducts.length > 0 ? (

              <div className="products-grid">

                {filteredProducts.map((product) => (

                  <div
                    key={product._id}
                    className="search-result"
                  >

                    <ProductCard
                      id={product._id}
                      image={product.image}
                      name={product.name}
                      category={product.category}
                      price={product.price}
                      badge={product.badge}
                      rating={product.rating}
                    />

                  </div>

                ))}

              </div>

            ) : (

              <div className="empty-search">

                <FaSearch />

                <h3>
                  No Products Found
                </h3>

                <p>
                  We couldn't find any products
                  matching your search.
                </p>

              </div>

            )}

          </div>

        )}


        {/* ============================
            POPULAR SEARCHES
        ============================ */}

        <div className="overlay-section">

          <h3>
            Popular Searches
          </h3>


          <div className="popular-tags">

            <button
              type="button"
              onClick={() =>
                handlePopularSearch("bags")
              }
            >
              Luxury Bags
            </button>


            <button
              type="button"
              onClick={() =>
                handlePopularSearch("perfumes")
              }
            >
              Perfumes
            </button>


            <button
              type="button"
              onClick={() =>
                handlePopularSearch("jewelry")
              }
            >
              Jewelry
            </button>


            <button
              type="button"
              onClick={() =>
                handlePopularSearch("hair")
              }
            >
              Hair
            </button>


            <button
              type="button"
              onClick={() =>
                handlePopularSearch("watches")
              }
            >
              Watches
            </button>


            <button
              type="button"
              onClick={() =>
                handlePopularSearch("shoes")
              }
            >
              Shoes
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}


export default SearchOverlay;