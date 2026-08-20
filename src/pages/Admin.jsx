import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/admin.css";

function Admin() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ============================
  // GET ADMIN STATISTICS
  // ============================

const fetchStats = async () => {

  try {

    setLoading(true);
    setError("");

    // ============================
    // GET JWT TOKEN
    // ============================

    const token =
      localStorage.getItem("token");


    // ============================
    // FETCH ADMIN STATISTICS
    // ============================

    const response = await fetch(
      "https://velmira-backend.onrender.com/api/admin/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );


    const data =
      await response.json();


    // ============================
    // HANDLE ERROR
    // ============================

    if (!response.ok) {

      throw new Error(
        data.message ||
        "Failed to load admin statistics"
      );

    }


    // ============================
    // SAVE STATISTICS
    // ============================

    setStats(data);

  } catch (error) {

    console.error(
      "Admin stats error:",
      error
    );

    setError(
      error.message ||
      "Failed to load admin statistics"
    );

  } finally {

    setLoading(false);

  }

};

  // ============================
  // LOAD STATISTICS
  // ============================

  useEffect(() => {

    fetchStats();

  }, []);


  // ============================
  // FORMAT REVENUE
  // ============================

  const formatRevenue = (amount) => {

    return `₦${Number(
      amount || 0
    ).toLocaleString("en-NG")}`;

  };


  // ============================
  // LOADING
  // ============================

  if (loading) {

    return (

      <div className="admin-dashboard">

        <div className="admin-dashboard-header">

          <h1>
            Velmira Admin Dashboard
          </h1>

          <p>
            Loading dashboard statistics...
          </p>

        </div>

      </div>

    );

  }


  // ============================
  // ERROR
  // ============================

  if (error) {

    return (

      <div className="admin-dashboard">

        <div className="admin-dashboard-header">

          <h1>
            Velmira Admin Dashboard
          </h1>

          <p>
            Welcome to the Velmira administration panel.
          </p>

        </div>


        <div className="admin-stats-error">

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={fetchStats}
          >
            Try Again
          </button>

        </div>

      </div>

    );

  }


  // ============================
  // ADMIN DASHBOARD
  // ============================

  return (

    <div className="admin-dashboard">


      {/* ============================
          HEADER
      ============================ */}

      <div className="admin-dashboard-header">

        <h1>
          Velmira Admin Dashboard
        </h1>

        <p>
          Welcome to the Velmira administration panel.
        </p>

      </div>


      {/* ============================
          STATISTICS
      ============================ */}

      <div className="admin-stats-grid">


        {/* PRODUCTS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            🛍️
          </div>

          <div className="admin-stat-content">

            <span>
              Total Products
            </span>

            <strong>
              {stats.totalProducts}
            </strong>

          </div>

        </div>


        {/* USERS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            👤
          </div>

          <div className="admin-stat-content">

            <span>
              Total Users
            </span>

            <strong>
              {stats.totalUsers}
            </strong>

          </div>

        </div>


        {/* ORDERS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            📦
          </div>

          <div className="admin-stat-content">

            <span>
              Total Orders
            </span>

            <strong>
              {stats.totalOrders}
            </strong>

          </div>

        </div>


        {/* REVENUE */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            💰
          </div>

          <div className="admin-stat-content">

            <span>
              Total Revenue
            </span>

            <strong>
              {formatRevenue(
                stats.totalRevenue
              )}
            </strong>

          </div>

        </div>


      </div>


      {/* ============================
          MANAGEMENT
      ============================ */}

      <div className="admin-management">

        <h2>
          Store Management
        </h2>

        <p>
          Manage your Velmira products,
          orders and customers.
        </p>


        <div className="admin-management-actions">

          <Link to="/admin/products">
            Products
          </Link>

          <Link to="/admin/orders">
            Orders
          </Link>

          <Link to="/admin/users">
            Users
          </Link>

        </div>

      </div>


      {/* ============================
          BACK TO STORE
      ============================ */}

      <div className="admin-dashboard-footer">

        <Link
          to="/"
          className="admin-back-to-store"
        >
          ← Back to Velmira Store
        </Link>

      </div>


    </div>

  );

}


export default Admin;
