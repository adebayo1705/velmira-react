import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import { getOrderById } from "../api/orderApi";

import "../styles/order-details.css";

function OrderDetails() {

  const { orderId } = useParams();

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ============================
  // LOAD ORDER
  // ============================

  useEffect(() => {

    const loadOrderDetails =
      async () => {

        try {

          console.log(
            "LOADING ORDER:",
            orderId
          );


          // ============================
          // GET ORDER
          // ============================

          const orderData =
            await getOrderById(
              orderId
            );


          console.log(
            "ORDER DETAILS:",
            orderData
          );


          console.log(
            "ORDER PRODUCTS:",
            orderData.products
          );


          setOrder(
            orderData
          );


        } catch (error) {

          console.error(
            "ORDER DETAILS ERROR:",
            error
          );


          setError(
            error.message ||
              "Failed to load order details."
          );


        } finally {

          setLoading(false);

        }

      };


    if (orderId) {

      loadOrderDetails();

    } else {

      setError(
        "No order ID was provided."
      );

      setLoading(false);

    }

  }, [orderId]);


  // ============================
  // FORMAT PRICE
  // ============================

  const formatPrice = (price) => {

    return `₦${Number(
      price || 0
    ).toLocaleString()}`;

  };


  // ============================
  // FORMAT DATE
  // ============================

  const formatDate = (date) => {

    if (!date) {

      return "N/A";

    }


    return new Date(
      date
    ).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

  };


  // ============================
  // FORMAT TIME
  // ============================

  const formatTime = (date) => {

    if (!date) {

      return "N/A";

    }


    return new Date(
      date
    ).toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );

  };


  // ============================
  // LOADING
  // ============================

  if (loading) {

    return (

      <>

        <Navbar />


        <main
          className="order-details-page"
        >

          <div className="container">

            <h1>
              Loading order...
            </h1>

          </div>

        </main>


        <Footer />

      </>

    );

  }


  // ============================
  // ERROR
  // ============================

  if (error) {

    return (

      <>

        <Navbar />


        <main
          className="order-details-page"
        >

          <div className="container">

            <h1>
              Order Details
            </h1>


            <p>
              {error}
            </p>


            <Link to="/account">
              ← Back to My Account
            </Link>

          </div>

        </main>


        <Footer />

      </>

    );

  }


  // ============================
  // ORDER NOT FOUND
  // ============================

  if (!order) {

    return (

      <>

        <Navbar />


        <main
          className="order-details-page"
        >

          <div className="container">

            <h1>
              Order not found
            </h1>


            <Link to="/account">
              ← Back to My Account
            </Link>

          </div>

        </main>


        <Footer />

      </>

    );

  }


  // ============================
  // PAGE
  // ============================

  return (

    <>

      <Navbar />


      <main
        className="order-details-page"
      >

        <div className="container">


          {/* ============================
              RECEIPT HEADER
          ============================ */}

          <div className="receipt-header">

            <h1>
              Order Details
            </h1>


            <p>
              Thank you for your purchase
            </p>

          </div>


          {/* ============================
              RECEIPT
          ============================ */}

          <div className="order-receipt">


            {/* ============================
                ORDER HEADER
            ============================ */}

            <div
              className="receipt-order-header"
            >

              <div>

                <span>
                  Order Number
                </span>


                <strong>
                  #{order._id}
                </strong>

              </div>


              <div
                className="receipt-date"
              >

                <div>

                  <span>
                    Date
                  </span>


                  <strong>
                    {formatDate(
                      order.createdAt
                    )}
                  </strong>

                </div>


                <div>

                  <span>
                    Time
                  </span>


                  <strong>
                    {formatTime(
                      order.createdAt
                    )}
                  </strong>

                </div>

              </div>

            </div>


            {/* ============================
                ORDER STATUS
            ============================ */}

            <div
              className="receipt-status-row"
            >

              <span>
                Status
              </span>


              <strong
                className="receipt-status"
              >

                {order.status}

              </strong>

            </div>


            {/* ============================
                PAYMENT STATUS
            ============================ */}

            <div
              className="receipt-status-row"
            >

              <span>
                Payment Status
              </span>


              <strong
                className="receipt-status"
              >

                {order.paymentStatus ||
                  "Pending"}

              </strong>

            </div>


            {/* ============================
                PAYMENT REFERENCE
            ============================ */}

            <div
              className="receipt-status-row"
            >

              <span>
                Payment Reference
              </span>


              <strong>

                {order.paymentReference ||
                  "N/A"}

              </strong>

            </div>


            {/* ============================
                ITEMS
            ============================ */}

            <section
              className="receipt-section"
            >

              <h2>
                Items
              </h2>


              <div
                className="receipt-products"
              >

                {order.products?.map(
                  (item) => {

                    /*
                      productId is the
                      populated product object.
                    */

                    const product =
                      item.productId;


                    const itemTotal =
                      Number(
                        item.price || 0
                      ) *
                      Number(
                        item.quantity || 0
                      );


                    /*
                      FIX PRODUCT IMAGE URL

                      Database currently stores:

                      /velmira-react/images/products/watch1.jpg

                      But Vite public files are served from:

                      /images/products/watch1.jpg

                      So remove the old
                      /velmira-react prefix.
                    */

                    const productImage =
                      product?.image
                        ?.replace(
                          /^\/velmira-react/,
                          ""
                        );


                    return (

                      <div
                        className="receipt-product"
                        key={item._id}
                      >


                        {/* ============================
                            PRODUCT IMAGE
                        ============================ */}

                        <div
                          className="receipt-product-image"
                        >

                          {productImage ? (

                            <img
                              src={
                                productImage
                              }
                              alt={
                                product.name ||
                                "Product"
                              }
                              onError={(e) => {

                                console.error(
                                  "PRODUCT IMAGE FAILED:",
                                  productImage
                                );

                                e.currentTarget.style.display =
                                  "none";

                              }}
                            />

                          ) : (

                            <div
                              className="receipt-image-placeholder"
                            >
                              No Image
                            </div>

                          )}

                        </div>


                        {/* ============================
                            PRODUCT DETAILS
                        ============================ */}

                        <div
                          className="receipt-product-details"
                        >

                          <h3>

                            {product?.name ||
                              "Product"}

                          </h3>


                          <p>

                            {product?.category ||
                              ""}

                          </p>


                          <span>

                            Quantity:{" "}
                            {item.quantity}

                          </span>

                        </div>


                        {/* ============================
                            PRODUCT PRICE
                        ============================ */}

                        <div
                          className="receipt-product-price"
                        >

                          <span>

                            {formatPrice(
                              item.price
                            )}{" "}

                            ×{" "}

                            {item.quantity}

                          </span>


                          <strong>

                            {formatPrice(
                              itemTotal
                            )}

                          </strong>

                        </div>


                      </div>

                    );

                  }
                )}

              </div>

            </section>


            {/* ============================
                DELIVERY
            ============================ */}

            <section
              className="receipt-section"
            >

              <h2>
                Delivery
              </h2>


              <div
                className="receipt-information"
              >

                <div>

                  <span>
                    Delivery Method
                  </span>


                  <strong>

                    {order.delivery?.method ||
                      "N/A"}

                  </strong>

                </div>


                <div>

                  <span>
                    Delivery Address
                  </span>


                  <strong>

                    {order.delivery?.address ||
                      "N/A"}

                  </strong>

                </div>

              </div>

            </section>


            {/* ============================
                CUSTOMER
            ============================ */}

            <section
              className="receipt-section"
            >

              <h2>
                Customer
              </h2>


              <div
                className="receipt-information"
              >

                <div>

                  <span>
                    Name
                  </span>


                  <strong>

                    {order.customer?.name ||
                      "N/A"}

                  </strong>

                </div>


                <div>

                  <span>
                    Email
                  </span>


                  <strong>

                    {order.customer?.email ||
                      "N/A"}

                  </strong>

                </div>

              </div>

            </section>


            {/* ============================
                TOTAL
            ============================ */}

            <div
              className="receipt-total"
            >

              <span>
                Total
              </span>


              <strong>

                {formatPrice(
                  order.total
                )}

              </strong>

            </div>


          </div>


          {/* ============================
              BOTTOM BACK LINK
          ============================ */}

          <div
            className="receipt-bottom-link"
          >

            <Link to="/account">

              ← Back to My Account

            </Link>

          </div>


        </div>

      </main>


      <Footer />

    </>

  );

}


export default OrderDetails;