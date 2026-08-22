import {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import {
  useAuth
} from "../../context/AuthContext";

import {
  useToast
} from "../../context/ToastContext";

import {
  getAdminOrders,
  updateAdminOrderStatus
} from "../../api/adminOrderApi";

import "../../styles/adminOrders.css";


function AdminOrders() {

  const navigate =
    useNavigate();


  const {
    isAuthenticated,
    user
  } = useAuth();


  const {
    showToast
  } = useToast();


  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ============================
  // IMAGE URL
  // ============================

  const getImageUrl = (image) => {

    if (!image) {
      return "";
    }


    // Full external image URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }


    // Remove old /velmira-react prefix
    return image.replace(
      /^\/velmira-react/,
      ""
    );

  };


  // ============================
  // GET ORDERS
  // ============================

  const fetchOrders =
    async () => {

      try {

        setLoading(true);

        setError("");


        console.log(
          "LOADING ADMIN ORDERS..."
        );


        const data =
          await getAdminOrders();


        console.log(
          "ADMIN ORDERS:",
          data
        );


        setOrders(data);


      } catch (error) {

        console.error(
          "ADMIN ORDERS ERROR:",
          error
        );


        setError(
          error.message ||
          "Failed to fetch orders"
        );


        showToast(
          error.message ||
          "Failed to load orders",
          "error"
        );


      } finally {

        setLoading(false);

      }

    };


  // ============================
  // LOAD ORDERS
  // ============================

  useEffect(() => {

    if (
      isAuthenticated &&
      user?.isAdmin === true
    ) {

      fetchOrders();

    } else {

      setLoading(false);

    }

  }, [
    isAuthenticated,
    user
  ]);


  // ============================
  // CHANGE STATUS LOCALLY
  // ============================

  const handleStatusSelect = (
    orderId,
    newStatus
  ) => {

    setOrders(
      (previousOrders) =>

        previousOrders.map(
          (order) =>

            order._id === orderId

              ? {
                  ...order,
                  selectedStatus:
                    newStatus
                }

              : order
        )
    );

  };


  // ============================
  // UPDATE ORDER STATUS
  // ============================

  const handleUpdateStatus =
    async (orderId) => {

      const order =
        orders.find(
          (item) =>
            item._id === orderId
        );


      if (!order) {

        return;

      }


      const newStatus =
        order.selectedStatus ||
        order.status ||
        "Pending";


      // ============================
      // DON'T UPDATE IF SAME STATUS
      // ============================

      if (
        newStatus ===
        order.status
      ) {

        return;

      }


      try {

        console.log(
          "UPDATING ORDER STATUS:",
          orderId,
          newStatus
        );


        const updatedOrder =
          await updateAdminOrderStatus(
            orderId,
            newStatus
          );


        console.log(
          "UPDATED ORDER:",
          updatedOrder
        );


        // ============================
        // UPDATE LOCAL STATE
        // ============================

        setOrders(
          (previousOrders) =>

            previousOrders.map(
              (item) =>

                item._id === orderId

                  ? {
                      ...updatedOrder,
                      selectedStatus:
                        undefined
                    }

                  : item
            )
        );


        showToast(
          "Order status updated successfully!",
          "success"
        );


      } catch (error) {

        console.error(
          "UPDATE STATUS ERROR:",
          error
        );


        showToast(
          error.message ||
          "Failed to update order status",
          "error"
        );

      }

    };


  // ============================
  // FORMAT PRICE
  // ============================

  const formatPrice = (
    price
  ) => {

    return `₦${Number(
      price || 0
    ).toLocaleString()}`;

  };


  // ============================
  // FORMAT DATE
  // ============================

  const formatDate = (
    date
  ) => {

    if (!date) {

      return "—";

    }


    return new Date(
      date
    ).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );

  };


  // ============================
  // STATUS CLASS
  // ============================

  const getStatusClass = (
    status
  ) => {

    switch (status) {

      case "Pending":
        return "status-pending";

      case "Processing":
        return "status-processing";

      case "Shipped":
        return "status-shipped";

      case "Delivered":
        return "status-delivered";

      case "Cancelled":
        return "status-cancelled";

      default:
        return "status-pending";

    }

  };


  // ============================
  // NOT LOGGED IN
  // ============================

  if (!isAuthenticated) {

    navigate(
      "/login"
    );

    return null;

  }


  // ============================
  // NOT ADMIN
  // ============================

  if (
    user?.isAdmin !== true
  ) {

    navigate(
      "/account"
    );

    return null;

  }


  // ============================
  // LOADING
  // ============================

  if (loading) {

    return (

      <div
        className="admin-orders-page"
      >

        <div
          className="admin-orders-container"
        >

          <div
            className="admin-orders-loading"
          >

            <div
              className="admin-orders-spinner"
            ></div>


            <h2>
              Loading Orders
            </h2>


            <p>
              Please wait while we load your
              orders...
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

      <div
        className="admin-orders-page"
      >

        <div
          className="admin-orders-container"
        >

          <div
            className="admin-orders-error-box"
          >

            <span
              className="admin-orders-error-icon"
            >
              !
            </span>


            <h1>
              Unable to Load Orders
            </h1>


            <p>
              {error}
            </p>


            <button
              type="button"
              className="admin-orders-retry"
              onClick={fetchOrders}
            >
              Try Again
            </button>


            <button
              type="button"
              className="admin-orders-back-button"
              onClick={() =>
                navigate("/admin")
              }
            >
              ← Back to Admin
            </button>

          </div>

        </div>

      </div>

    );

  }


  // ============================
  // ORDERS PAGE
  // ============================

  return (

    <div
      className="admin-orders-page"
    >

      <div
        className="admin-orders-container"
      >


        {/* ============================
            HEADER
        ============================ */}

        <div
          className="admin-orders-header"
        >

          <div
            className="admin-orders-heading"
          >

            <span
              className="admin-orders-eyebrow"
            >
              VELMIRA ADMIN
            </span>


            <h1>
              Orders
            </h1>


            <p>
              Manage customer orders,
              payments, delivery and status.
            </p>

          </div>


          <div
            className="admin-orders-header-actions"
          >

            <button
              type="button"
              className="admin-orders-back-button"
              onClick={() =>
                navigate("/admin")
              }
            >
              ← Back to Admin
            </button>


            <div
              className="admin-orders-count"
            >

              <strong>
                {orders.length}
              </strong>


              <span>
                Total Orders
              </span>

            </div>

          </div>

        </div>


        {/* ============================
            ORDERS
        ============================ */}

        <div
          className="admin-orders-list"
        >

          {orders.length === 0 ? (

            <div
              className="admin-orders-empty"
            >

              <div
                className="admin-orders-empty-icon"
              >
                ⌁
              </div>


              <h2>
                No Orders Found
              </h2>


              <p>
                There are currently no orders
                in your Velmira store.
              </p>


              <button
                type="button"
                className="admin-orders-back-button"
                onClick={() =>
                  navigate("/admin")
                }
              >
                ← Back to Admin
              </button>

            </div>

          ) : (

            orders.map(
              (order) => {

                const currentStatus =
                  order.selectedStatus ||
                  order.status ||
                  "Pending";


                const hasStatusChanged =
                  currentStatus !==
                  order.status;


                return (

                  <div
                    className="admin-order-card"
                    key={order._id}
                  >


                    {/* ============================
                        ORDER HEADER
                    ============================ */}

                    <div
                      className="admin-order-top"
                    >

                      <div
                        className="admin-order-heading"
                      >

                        <span>
                          ORDER
                        </span>


                        <h2>
                          #
                          {order._id
                            .slice(-6)
                            .toUpperCase()}
                        </h2>


                        <p>
                          {formatDate(
                            order.createdAt
                          )}
                        </p>

                      </div>


                      {/* ============================
                          STATUS
                      ============================ */}

                      <div
                        className="admin-order-status"
                      >

                        <span
                          className={`order-status-badge ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>


                        <select
                          value={
                            currentStatus
                          }

                          onChange={(
                            event
                          ) =>
                            handleStatusSelect(
                              order._id,
                              event.target.value
                            )
                          }
                        >

                          <option value="Pending">
                            Pending
                          </option>


                          <option value="Processing">
                            Processing
                          </option>


                          <option value="Shipped">
                            Shipped
                          </option>


                          <option value="Delivered">
                            Delivered
                          </option>


                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>


                        <button
                          type="button"
                          className="admin-orders-update-button"
                          onClick={() =>
                            handleUpdateStatus(
                              order._id
                            )
                          }
                          disabled={
                            !hasStatusChanged
                          }
                        >
                          Update Status
                        </button>

                      </div>

                    </div>


                    {/* ============================
                        CUSTOMER
                    ============================ */}

                    <div
                      className="admin-order-section"
                    >

                      <h3>
                        Customer
                      </h3>


                      <div
                        className="admin-order-customer"
                      >

                        <div
                          className="admin-order-avatar"
                        >

                          {(order.customer?.name ||
                            order.user?.name ||
                            "U")
                            .charAt(0)
                            .toUpperCase()}

                        </div>


                        <div>

                          <strong>
                            {order.customer?.name ||
                              order.user?.name ||
                              "Unknown"}
                          </strong>


                          <p>
                            {order.customer?.email ||
                              order.user?.email ||
                              "No email"}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* ============================
                        PRODUCTS
                    ============================ */}

                    <div
                      className="admin-order-section"
                    >

                      <h3>
                        Products
                      </h3>


                      <div
                        className="admin-order-products"
                      >

                        {order.products?.map(
                          (
                            item,
                            index
                          ) => (

                            <div
                              className="admin-order-product"
                              key={
                                item._id ||
                                index
                              }
                            >

                              {item.productId?.image ? (

                                <img
                                  src={
                                    getImageUrl(
                                      item.productId.image
                                    )
                                  }
                                  alt={
                                    item.productId.name ||
                                    "Product"
                                  }
                                />

                              ) : (

                                <div
                                  className="admin-order-product-placeholder"
                                >
                                  No Image
                                </div>

                              )}


                              <div
                                className="admin-order-product-info"
                              >

                                <strong>
                                  {item.productId?.name ||
                                    "Product unavailable"}
                                </strong>


                                <p>
                                  Quantity:{" "}
                                  {item.quantity}
                                </p>


                                <p>
                                  Price:{" "}
                                  {formatPrice(
                                    item.price
                                  )}
                                </p>

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    </div>


                    {/* ============================
                        DELIVERY / PAYMENT / TOTAL
                    ============================ */}

                    <div
                      className="admin-order-details-grid"
                    >

                      <div>

                        <span>
                          DELIVERY
                        </span>


                        <h3>
                          {order.delivery?.method ||
                            "—"}
                        </h3>

                      </div>


                      <div>

                        <span>
                          ADDRESS
                        </span>


                        <h3>
                          {order.delivery?.address ||
                            "—"}
                        </h3>

                      </div>


                      <div>

                        <span>
                          PAYMENT
                        </span>


                        <h3>
                          {order.paymentMethod ||
                            "—"}
                        </h3>

                      </div>


                      <div
                        className="admin-order-total-box"
                      >

                        <span>
                          TOTAL
                        </span>


                        <h3
                          className="admin-order-total"
                        >
                          {formatPrice(
                            order.total
                          )}
                        </h3>

                      </div>

                    </div>

                  </div>

                );

              }
            )

          )}

        </div>

      </div>

    </div>

  );

}


export default AdminOrders;