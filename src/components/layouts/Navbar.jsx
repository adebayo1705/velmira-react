console.log("NAVBAR RENDERING");

import "../../styles/navbar.css";

import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import SearchOverlay from "../ui/SearchOverlay";

import { getProducts } from "../../api/productApi";

import logo from "../../assets/images/logo.png";

import {
  FaBars,
  FaTimes,
  FaHeart,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";


function Navbar() {

  const { isAuthenticated, logout } = useAuth();


  // ============================
  // PRODUCTS
  // ============================

  const [products, setProducts] = useState([]);


  // ============================
  // LOAD PRODUCTS
  // ============================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        const data = await getProducts();

        console.log(
          "NAVBAR BACKEND PRODUCTS:",
          data
        );

        setProducts(data);

      } catch (error) {

        console.error(
          "NAVBAR PRODUCT ERROR:",
          error
        );

      }

    };


    loadProducts();

  }, []);


  console.log(
    "Navbar product count:",
    products.length
  );


  // ============================
  // NAVIGATION LINKS
  // ============================

  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];


  // ============================
  // STATES
  // ============================

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cartCount, setCartCount] =
    useState(0);

  const [searchOpen, setSearchOpen] =
    useState(false);


  // ============================
  // CART COUNT
  // ============================

  useEffect(() => {

    const updateCartCount = () => {

      const cart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];


      const totalQuantity =
        cart.reduce(
          (total, item) =>
            total +
            Number(item.quantity || 0),
          0
        );


      setCartCount(totalQuantity);

    };


    updateCartCount();


    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );


    return () => {

      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );

    };

  }, []);


  // ============================
  // LOGOUT
  // ============================

  const handleLogout = () => {

    logout();

    setMenuOpen(false);

  };


  // ============================
  // RENDER
  // ============================

  return (
    <>


      {/* ============================
          HEADER
      ============================ */}

      <header>

        <div className="container nav-container">


          {/* ============================
              LOGO
          ============================ */}

          <Link
            to="/home"
            className="logo"
          >

            <img
              src={logo}
              alt="Velmira Logo"
            />

          </Link>


          {/* ============================
              NAVIGATION
          ============================ */}

          <nav className="navbar">


            {/* ============================
                DESKTOP NAV LINKS
            ============================ */}

            <ul className="nav-links">

              {links.map((link) => (

                <li key={link.name}>

                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "active"
                        : ""
                    }
                  >
                    {link.name}
                  </NavLink>

                </li>

              ))}


{/* ACCOUNT */}

{isAuthenticated && (

  <li className="nav-account">

    <NavLink
      to="/account"
      className={({ isActive }) =>
        `account-link ${
          isActive ? "active" : ""
        }`
      }
    >
      Account
    </NavLink>

  </li>

)}

{/* LOGIN / LOGOUT */}

<li className="nav-auth">

  {isAuthenticated ? (

    <NavLink
      to="/home"
      onClick={handleLogout}
      className="logout-link"
    >
      Logout
    </NavLink>

  ) : (

    <NavLink
      to="/login"
      className="login-link"
    >
      Login
    </NavLink>

  )}

</li>
            </ul>


            {/* ============================
                MOBILE MENU
            ============================ */}

            <div
              className={`mobile-menu ${
                menuOpen
                  ? "mobile-menu-open"
                  : ""
              }`}
            >


              {links.map((link) => (

                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  {link.name}
                </NavLink>

              ))}


{/* ============================
    MOBILE ACCOUNT
============================ */}

{isAuthenticated && (

  <NavLink
    to="/account"
    className={({ isActive }) =>
      `account-link ${
        isActive ? "active" : ""
      }`
    }
    onClick={() =>
      setMenuOpen(false)
    }
  >
    Account
  </NavLink>

)}


{/* ============================
    MOBILE LOGIN / LOGOUT
============================ */}

{isAuthenticated ? (

  <NavLink
    to="/home"
    className="logout-link"
    onClick={handleLogout}
  >
    Logout
  </NavLink>

) : (

  <NavLink
    to="/login"
    className="login-link"
    onClick={() =>
      setMenuOpen(false)
    }
  >
    Login
  </NavLink>

)}

              {/* ============================
                  MOBILE ICONS
              ============================ */}

              <div className="mobile-icons">


                {/* SEARCH */}

                <button
                  type="button"
                  className="search-trigger"
                  onClick={() => {

                    setSearchOpen(true);

                    setMenuOpen(false);

                  }}
                >

                  <FaSearch />

                  <span>
                    Search
                  </span>

                </button>


                {/* WISHLIST */}

                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    isActive
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >

                  <FaHeart />

                  <span>
                    Wishlist
                  </span>

                </NavLink>


                {/* CART */}

                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `cart-icon ${
                      isActive
                        ? "active"
                        : ""
                    }`
                  }
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >

                  <span className="cart-icon-wrapper">

                    <FaShoppingCart />

                    <span className="cart-count">
                      {cartCount}
                    </span>

                  </span>

                  <span>
                    Cart
                  </span>

                </NavLink>


              </div>

            </div>

          </nav>


          {/* ============================
              DESKTOP ICONS
          ============================ */}

          <div className="nav-icons">


            {/* SEARCH */}

            <button
              type="button"
              className="search-trigger"
              onClick={() => {

                setSearchOpen(true);

                setMenuOpen(false);

              }}
            >

              <FaSearch />

            </button>


            {/* WISHLIST */}

            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive
                  ? "active"
                  : ""
              }
            >

              <FaHeart />

            </NavLink>


            {/* CART */}

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `cart-icon ${
                  isActive
                    ? "active"
                    : ""
                }`
              }
            >

              <span className="cart-icon-wrapper">

                <FaShoppingCart />

                <span className="cart-count">
                  {cartCount}
                </span>

              </span>

            </NavLink>


          </div>


          {/* ============================
              MOBILE TOGGLE
          ============================ */}

          <button
            className="menu-toggle"
            aria-label="Toggle navigation"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >

            {menuOpen
              ? <FaTimes />
              : <FaBars />
            }

          </button>


        </div>

      </header>


      {/* ============================
          SEARCH OVERLAY
      ============================ */}

      <SearchOverlay
        products={products}
        isOpen={searchOpen}
        onClose={() =>
          setSearchOpen(false)
        }
      />


    </>
  );
}


export default Navbar;