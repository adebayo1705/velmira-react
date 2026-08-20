import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import ScrollToTop
  from "./components/layouts/ScrollToTop";

import ProtectedRoute
  from "./components/layouts/ProtectedRoute";

import AdminRoute
  from "./components/layouts/AdminRoute";


import Admin
  from "./pages/Admin";

import AdminUsers
  from "./pages/admin/AdminUsers";

import AdminProducts
  from "./pages/admin/AdminProducts";

import AdminAddProduct
  from "./pages/admin/AdminAddProduct";

import AdminEditProduct
  from "./pages/admin/AdminEditProduct";

import AdminOrders
  from "./pages/admin/AdminOrders";

import PaymentCallback from "./pages/PaymentCallback";


import Login
  from "./pages/Login";

import Register
  from "./pages/Register";


import Home
  from "./pages/Home";

import Shop
  from "./pages/Shop";

import Cart
  from "./pages/Cart";

import Checkout
  from "./pages/Checkout";

import Wishlist
  from "./pages/Wishlist";

import About
  from "./pages/About";

import Contact
  from "./pages/Contact";

import Account
  from "./pages/Account";

import OrderDetails
  from "./pages/OrderDetails";


function App() {

  return (

    <BrowserRouter
      basename="/velmira-react"
    >

      <ScrollToTop />


      <Routes>


        {/* ============================
            HOME
        ============================ */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/home"
          element={<Home />}
        />


        {/* ============================
            SHOP
        ============================ */}

        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* ============================
            AUTHENTICATION
        ============================ */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ============================
            PROTECTED ACCOUNT
        ============================ */}

        <Route
          path="/account"
          element={

            <ProtectedRoute>

              <Account />

            </ProtectedRoute>

          }
        />


        {/* ============================
            PROTECTED CHECKOUT
        ============================ */}

        <Route
          path="/checkout"
          element={

            <ProtectedRoute>

              <Checkout />

            </ProtectedRoute>

          }
        />


        {/* ============================
            PROTECTED ORDER DETAILS
        ============================ */}

        <Route
          path="/account/orders/:orderId"
          element={

            <ProtectedRoute>

              <OrderDetails />

            </ProtectedRoute>

          }
        />


        {/* ============================
            ADMIN DASHBOARD
        ============================ */}

        <Route
          path="/admin"
          element={

            <AdminRoute>

              <Admin />

            </AdminRoute>

          }
        />


        {/* ============================
            ADMIN PRODUCTS
        ============================ */}

        <Route
          path="/admin/products"
          element={

            <AdminRoute>

              <AdminProducts />

            </AdminRoute>

          }
        />


        {/* ============================
            ADMIN ORDERS
        ============================ */}

        <Route
          path="/admin/orders"
          element={

            <AdminRoute>

              <AdminOrders />

            </AdminRoute>

          }
        />


        {/* ============================
            ADMIN USERS
        ============================ */}

        <Route
          path="/admin/users"
          element={

            <AdminRoute>

              <AdminUsers />

            </AdminRoute>

          }
        />


        {/* ============================
            ADMIN ADD PRODUCT
        ============================ */}

        <Route
          path="/admin/products/add"
          element={

            <AdminRoute>

              <AdminAddProduct />

            </AdminRoute>

          }
        />


        {/* ============================
            ADMIN EDIT PRODUCT
        ============================ */}

        <Route
          path="/admin/products/edit/:id"
          element={

            <AdminRoute>

              <AdminEditProduct />

            </AdminRoute>

          }
        />

<Route
  path="/payment/callback"
  element={<PaymentCallback />}
/>

      </Routes>

    </BrowserRouter>

  );

}


export default App;
