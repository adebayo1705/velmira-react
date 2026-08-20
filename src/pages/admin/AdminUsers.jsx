import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useToast } from "../../context/ToastContext";

import "../../styles/adminUsers.css";

function AdminUsers() {
  const { showToast } = useToast();

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [customerToDelete, setCustomerToDelete] = useState(null);

  // ============================
  // GET USERS + ORDERS
  // ============================

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [usersResponse, ordersResponse] =
        await Promise.all([
          fetch("https://velmira-backend.onrender.com/api/users"),
          fetch("https://velmira-backend.onrender.com/api/orders"),
        ]);

      const usersData = await usersResponse.json();
      const ordersData = await ordersResponse.json();

      if (!usersResponse.ok) {
        throw new Error(
          usersData.message || "Failed to fetch users"
        );
      }

      if (!ordersResponse.ok) {
        throw new Error(
          ordersData.message || "Failed to fetch orders"
        );
      }

      setUsers(usersData);
      setOrders(ordersData);

    } catch (error) {
      console.error(error);

      setError(error.message);

      showToast(
        error.message || "Failed to load customers",
        "error"
      );

    } finally {
      setLoading(false);
    }
  };

  // ============================
  // LOAD DATA
  // ============================

  useEffect(() => {
    fetchData();
  }, []);

  // ============================
  // GET CUSTOMER ORDERS
  // ============================

  const getUserOrders = (user) => {
    return orders.filter((order) => {
      const customerId =
        order.customer?.userId ||
        order.customer?.user ||
        order.userId ||
        order.user;

      const customerEmail =
        order.customer?.email;

      return (
        customerId === user._id ||
        customerEmail?.toLowerCase() ===
          user.email?.toLowerCase()
      );
    });
  };

  // ============================
  // GET TOTAL SPENT
  // ============================

  const getUserTotalSpent = (user) => {
    const userOrders = getUserOrders(user);

    return userOrders.reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    );
  };

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
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ============================
  // OPEN DELETE MODAL
  // ============================

  const handleDeleteClick = (user) => {
    setCustomerToDelete(user);
  };

  // ============================
  // CLOSE DELETE MODAL
  // ============================

  const handleCancelDelete = () => {
    setCustomerToDelete(null);
  };

  // ============================
  // DELETE USER
  // ============================

  const handleConfirmDelete = async () => {
    if (!customerToDelete) {
      return;
    }

    try {
      const response = await fetch(
        `https://velmira-backend.onrender.com/api/users/${customerToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete customer"
        );
      }

      // Remove customer from table
      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) =>
            user._id !== customerToDelete._id
        )
      );

      // Close confirmation modal
      setCustomerToDelete(null);

      // Close customer details modal if open
      setSelectedUser(null);

      // Velmira web toast
      showToast(
        "Customer deleted successfully!",
        "success"
      );

    } catch (error) {
      console.error(error);

      setCustomerToDelete(null);

      showToast(
        error.message ||
          "Failed to delete customer",
        "error"
      );
    }
  };

  // ============================
  // SEARCH USERS
  // ============================

  const filteredUsers = users.filter((user) => {
    const searchValue =
      search.toLowerCase().trim();

    return (
      user.name
        ?.toLowerCase()
        .includes(searchValue) ||
      user.email
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <div className="admin-users-page">

        <div className="admin-users-header">

          <div>
            <h1>
              Customers
            </h1>

            <p>
              Loading customer information...
            </p>
          </div>

        </div>

      </div>
    );
  }

  // ============================
  // ERROR
  // ============================

  if (error) {
    return (
      <div className="admin-users-page">

        <div className="admin-users-header">

          <div>
            <h1>
              Customers
            </h1>

            <p className="admin-users-error">
              {error}
            </p>
          </div>

          <button
            type="button"
            className="admin-users-retry"
            onClick={fetchData}
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  // ============================
  // PAGE
  // ============================

  return (
    <div className="admin-users-page">

      {/* ============================
          HEADER
      ============================ */}

      <div className="admin-users-header">

        <div>

          <h1>
            Customers
          </h1>

          <p>
            Manage and view your Velmira customers.
          </p>

        </div>

        <div className="admin-users-header-actions">

          <Link
            to="/admin"
            className="admin-users-back"
          >
            ← Back to Admin
          </Link>

          <div className="admin-users-count">

            <strong>
              {users.length}
            </strong>

            <span>
              Total Customers
            </span>

          </div>

        </div>

      </div>


      {/* ============================
          SEARCH
      ============================ */}

      <div className="admin-users-toolbar">

        <div className="admin-users-search">

          <span>
            🔎
          </span>

          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        <span className="admin-users-result-count">
          {filteredUsers.length} customer
          {filteredUsers.length !== 1 ? "s" : ""}
        </span>

      </div>


      {/* ============================
          USERS TABLE
      ============================ */}

      <div className="admin-users-table-wrapper">

        <table className="admin-users-table">

          <thead>

            <tr>

              <th>
                #
              </th>

              <th>
                Customer
              </th>

              <th>
                Email
              </th>

              <th>
                Orders
              </th>

              <th>
                Total Spent
              </th>

              <th>
                Joined
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="admin-users-empty"
                >
                  No customers found.
                </td>

              </tr>

            ) : (

              filteredUsers.map((user, index) => {

                const userOrders =
                  getUserOrders(user);

                const totalSpent =
                  getUserTotalSpent(user);

                return (

                  <tr key={user._id}>

                    {/* NUMBER */}

                    <td>
                      {index + 1}
                    </td>


                    {/* CUSTOMER */}

                    <td>

                      <div className="admin-user-name">

                        <div className="admin-user-avatar">

                          {user.name
                            ? user.name
                                .charAt(0)
                                .toUpperCase()
                            : "U"}

                        </div>

                        <div>

                          <strong>
                            {user.name ||
                              "Unknown"}
                          </strong>

                          <small>
                            Customer
                          </small>

                        </div>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td>
                      {user.email}
                    </td>


                    {/* ORDERS */}

                    <td>

                      <span className="admin-user-orders">
                        {userOrders.length}
                      </span>

                    </td>


                    {/* TOTAL SPENT */}

                    <td>

                      <strong className="admin-user-spent">
                        {formatPrice(totalSpent)}
                      </strong>

                    </td>


                    {/* JOINED */}

                    <td>
                      {formatDate(
                        user.createdAt
                      )}
                    </td>


                    {/* ACTION */}

                    <td>

                      <div className="admin-user-actions">

                        <button
                          type="button"
                          className="admin-user-view-button"
                          onClick={() =>
                            setSelectedUser(user)
                          }
                        >
                          View
                        </button>

                        <button
                          type="button"
                          className="admin-user-delete-button"
                          onClick={() =>
                            handleDeleteClick(user)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                );
              })

            )}

          </tbody>

        </table>

      </div>


      {/* ============================
          CUSTOMER DETAILS MODAL
      ============================ */}

      {selectedUser && (

        <div className="admin-customer-overlay">

          <div className="admin-customer-modal">

            {/* ============================
                HEADER
            ============================ */}

            <div className="admin-customer-modal-header">

              <div className="admin-customer-profile">

                <div className="admin-customer-avatar">

                  {selectedUser.name
                    ? selectedUser.name
                        .charAt(0)
                        .toUpperCase()
                    : "U"}

                </div>

                <div>

                  <h2>
                    {selectedUser.name ||
                      "Unknown Customer"}
                  </h2>

                  <p>
                    {selectedUser.email}
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="admin-customer-close"
                onClick={() =>
                  setSelectedUser(null)
                }
              >
                ×
              </button>

            </div>


            {/* ============================
                CUSTOMER STATS
            ============================ */}

            <div className="admin-customer-stats">

              <div>

                <span>
                  Total Orders
                </span>

                <strong>
                  {getUserOrders(
                    selectedUser
                  ).length}
                </strong>

              </div>

              <div>

                <span>
                  Total Spent
                </span>

                <strong>
                  {formatPrice(
                    getUserTotalSpent(
                      selectedUser
                    )
                  )}
                </strong>

              </div>

              <div>

                <span>
                  Customer Since
                </span>

                <strong>
                  {formatDate(
                    selectedUser.createdAt
                  )}
                </strong>

              </div>

            </div>


            {/* ============================
                CUSTOMER INFORMATION
            ============================ */}

            <div className="admin-customer-information">

              <h3>
                Customer Information
              </h3>

              <div>

                <span>
                  Full Name
                </span>

                <strong>
                  {selectedUser.name ||
                    "Not available"}
                </strong>

              </div>

              <div>

                <span>
                  Email
                </span>

                <strong>
                  {selectedUser.email ||
                    "Not available"}
                </strong>

              </div>

              <div>

                <span>
                  Account Created
                </span>

                <strong>
                  {formatDate(
                    selectedUser.createdAt
                  )}
                </strong>

              </div>

            </div>


            {/* ============================
                ORDER HISTORY
            ============================ */}

            <div className="admin-customer-orders">

              <h3>
                Order History
              </h3>

              {getUserOrders(
                selectedUser
              ).length === 0 ? (

                <div className="admin-customer-no-orders">

                  <p>
                    This customer has not placed
                    any orders yet.
                  </p>

                </div>

              ) : (

                <div className="admin-customer-order-list">

                  {getUserOrders(
                    selectedUser
                  ).map((order) => (

                    <div
                      className="admin-customer-order"
                      key={order._id}
                    >

                      <div>

                        <strong>
                          Order #
                          {order._id
                            .slice(-6)
                            .toUpperCase()}
                        </strong>

                        <span>
                          {formatDate(
                            order.createdAt
                          )}
                        </span>

                      </div>

                      <div>

                        <strong>
                          {formatPrice(
                            order.total
                          )}
                        </strong>

                        <span
                          className={`admin-customer-status ${
                            order.status
                              ?.toLowerCase()
                              .replace(
                                " ",
                                "-"
                              )
                          }`}
                        >
                          {order.status ||
                            "Pending"}
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>


            {/* ============================
                MODAL ACTIONS
            ============================ */}

            <div className="admin-customer-modal-actions">

              <button
                type="button"
                className="admin-customer-close-button"
                onClick={() =>
                  setSelectedUser(null)
                }
              >
                Close
              </button>

              <button
                type="button"
                className="admin-customer-delete-button"
                onClick={() =>
                  handleDeleteClick(
                    selectedUser
                  )
                }
              >
                Delete Customer
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ============================
          DELETE CONFIRMATION MODAL
      ============================ */}

      {customerToDelete && (

        <div className="delete-modal-overlay">

          <div className="delete-modal">

            <div className="delete-modal-icon">
              !
            </div>

            <h2>
              Delete Customer?
            </h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {customerToDelete.name ||
                  "this customer"}
              </strong>
              ?
            </p>

            <p>
              This action cannot be undone.
            </p>

            <div className="delete-modal-actions">

              <button
                type="button"
                className="delete-modal-cancel"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-modal-confirm"
                onClick={handleConfirmDelete}
              >
                Delete Customer
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminUsers;
