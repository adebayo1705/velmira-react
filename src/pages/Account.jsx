import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../api/orderApi";
import authFetch from "../api/authFetch";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import "../styles/account.css";

function Account() {
  const { isAuthenticated } = useAuth();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const [error, setError] = useState("");
  const [ordersError, setOrdersError] = useState("");

  // ============================
  // GET USER PROFILE
  // ============================

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await authFetch("/users/me");

        setUser(data);
      } catch (error) {
        console.error("PROFILE ERROR:", error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      getProfile();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // ============================
  // GET MY ORDERS
  // ============================

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getMyOrders();

        console.log("MY ORDERS:", data);

        setOrders(data);
      } catch (error) {
        console.error("ORDERS ERROR:", error);

        setOrdersError(error.message);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (isAuthenticated) {
      loadOrders();
    } else {
      setOrdersLoading(false);
    }
  }, [isAuthenticated]);

  // ============================
  // USER NOT LOGGED IN
  // ============================

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ============================
  // PROFILE LOADING
  // ============================

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="account-page">
          <div className="container">
            <h1>Loading account...</h1>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ============================
  // PROFILE ERROR
  // ============================

  if (error) {
    return (
      <>
        <Navbar />

        <main className="account-page">
          <div className="container">
            <h1>My Account</h1>

            <p>{error}</p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ============================
  // FORMAT PRICE
  // ============================

  const formatPrice = (price) => {
    return `₦${Number(price || 0).toLocaleString()}`;
  };

  // ============================
  // FORMAT DATE
  // ============================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // ============================
  // ACCOUNT PAGE
  // ============================

  return (
    <>
      <Navbar />

      <main className="account-page">

        <div className="container">

          <div className="account-content">

            {/* ============================
                PAGE HEADER
            ============================ */}

            <div className="account-page-header">

              <h1>
                My Account
              </h1>

              <p>
                Welcome back, {user?.name}.
              </p>

            </div>


            {/* ============================
                ACCOUNT DETAILS
            ============================ */}

            <div className="account-details">

              <h2>
                Account Details
              </h2>


              <div className="account-detail">

                <strong>
                  Name
                </strong>

                <span>
                  {user?.name}
                </span>

              </div>


              <div className="account-detail">

                <strong>
                  Email
                </strong>

                <span>
                  {user?.email}
                </span>

              </div>


              <div className="account-detail">

                <strong>
                  Member Since
                </strong>

                <span>
                  {user?.createdAt
                    ? formatDate(user.createdAt)
                    : "N/A"}
                </span>

              </div>

            </div>


            {/* ============================
                ORDER HISTORY
            ============================ */}

            <section className="order-history">

              <div className="order-history-header">

                <div>

                  <h2>
                    My Orders
                  </h2>

                  <p>
                    View your recent purchases and order details.
                  </p>

                </div>

              </div>


              {/* ============================
                  LOADING
              ============================ */}

              {ordersLoading && (

                <div className="orders-message">

                  <p>
                    Loading orders...
                  </p>

                </div>

              )}


              {/* ============================
                  ERROR
              ============================ */}

              {!ordersLoading && ordersError && (

                <div className="orders-message">

                  <p>
                    {ordersError}
                  </p>

                </div>

              )}


              {/* ============================
                  NO ORDERS
              ============================ */}

              {!ordersLoading &&
                !ordersError &&
                orders.length === 0 && (

                  <div className="orders-message">

                    <p>
                      You haven't placed any orders yet.
                    </p>

                    <Link to="/shop">
                      Start Shopping
                    </Link>

                  </div>

                )}


              {/* ============================
                  ORDERS
              ============================ */}

              {!ordersLoading &&
                !ordersError &&
                orders.length > 0 && (

                  <div className="orders-list">

                    {orders.map((order) => (

                      <Link
                        to={`/account/orders/${order._id}`}
                        className="order-card"
                        key={order._id}
                      >

                        {/* ============================
                            ORDER HEADER
                        ============================ */}

                        <div className="order-header">

                          <div className="order-header-info">

                            <span className="order-label">
                              Order
                            </span>

                            <strong>
                              #{order._id}
                            </strong>

                            <p>
                              {formatDate(order.createdAt)}
                            </p>

                          </div>


<span
  className={`order-status order-status-${(
    order.status || "Pending"
  )
    .toLowerCase()
    .replace(/\s+/g, "-")}`}
>
  {order.status || "Pending"}
</span>

                        </div>


                        {/* ============================
                            ORDER SUMMARY
                        ============================ */}

                        <div className="order-summary">

                          <div className="order-summary-item">

                            <span>
                              Items
                            </span>

                            <strong>
                              {order.products?.reduce(
                                (total, item) =>
                                  total +
                                  Number(item.quantity || 0),
                                0
                              ) || 0}
                            </strong>

                          </div>


                          <div className="order-summary-item">

                            <span>
                              Payment
                            </span>

                            <strong
                              className={
                                order.paymentStatus === "Paid"
                                  ? "payment-paid"
                                  : ""
                              }
                            >
                              {order.paymentStatus ||
                                "Pending"}
                            </strong>

                          </div>


                          <div className="order-summary-item">

                            <span>
                              Total
                            </span>

                            <strong>
                              {formatPrice(order.total)}
                            </strong>

                          </div>

                        </div>


                        {/* ============================
                            VIEW ORDER
                        ============================ */}

                        <div className="order-card-footer">

                          <span>
                            View Order
                          </span>

                          <span className="order-arrow">
                            →
                          </span>

                        </div>

                      </Link>

                    ))}

                  </div>

                )}

            </section>

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}

export default Account;