import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../styles/admin-edit-product.css";


function AdminEditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    name: "",
    price: "",
    category: "",
    image: "",
    badge: "",
    rating: 5,

  });


  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  // ============================================================
  // IMAGE URL
  // ============================================================

  const getImageUrl = (image) => {

    if (!image) {

      return "";

    }


    // ==========================================================
    // FULL EXTERNAL IMAGE URL
    // ==========================================================

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {

      return image;

    }


    // ==========================================================
    // REMOVE OLD /velmira-react PREFIX
    //
    // Old:
    // /velmira-react/images/products/bag1.jpg
    //
    // New:
    // /images/products/bag1.jpg
    // ==========================================================

    return image.replace(
      /^\/velmira-react/,
      ""
    );

  };


  // ============================================================
  // GET PRODUCT
  // ============================================================

  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          setLoading(true);

          setError("");


          const response =
            await fetch(

              `https://velmira-backend.onrender.com/api/products/${id}`

            );


          const data =
            await response.json();


          if (!response.ok) {

            throw new Error(

              data.message ||
              "Failed to load product"

            );

          }


          // ====================================================
          // LOAD PRODUCT INTO FORM
          // ====================================================

          setFormData({

            name:
              data.name ||
              "",

            price:
              data.price ||
              "",

            category:
              data.category ||
              "",

            image:
              getImageUrl(
                data.image
              ),

            badge:
              data.badge ||
              "",

            rating:
              data.rating ||
              5,

          });


        } catch (error) {

          console.error(error);

          setError(
            error.message
          );


        } finally {

          setLoading(false);

        }

      };


    if (id) {

      fetchProduct();

    }

  }, [id]);


  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previousData) => ({

        ...previousData,

        [name]:
          value,

      })
    );

  };


  // ============================================================
  // UPDATE PRODUCT
  // ============================================================

  const handleSubmit = async (event) => {

    event.preventDefault();


    setMessage("");

    setError("");


    try {

      const response =
        await fetch(

          `https://velmira-backend.onrender.com/api/products/${id}`,

          {

            method: "PUT",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              ...formData,

              // Always save the
              // corrected image path.

              image:
                getImageUrl(
                  formData.image
                ),

              price:
                Number(
                  formData.price
                ),

              rating:
                Number(
                  formData.rating
                ),

            }),

          }

        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(

          data.message ||
          "Failed to update product"

        );

      }


      // ========================================================
      // SUCCESS
      // ========================================================

      setMessage(
        "Product updated successfully!"
      );


      // ========================================================
      // RETURN TO PRODUCTS
      // ========================================================

      setTimeout(() => {

        navigate(
          "/admin/products"
        );

      }, 1000);


    } catch (error) {

      console.error(error);


      setError(
        error.message
      );

    }

  };


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (

      <div
        className="admin-edit-product"
      >

        <div
          className="admin-edit-container"
        >

          <div
            className="admin-edit-loading"
          >

            Loading Product...

          </div>

        </div>

      </div>

    );

  }


  // ============================================================
  // PAGE
  // ============================================================

  return (

    <div
      className="admin-edit-product"
    >


      <div
        className="admin-edit-container"
      >


        {/* ======================================================
            HEADER
        ====================================================== */}

        <div
          className="admin-edit-header"
        >

          <div>

            <span
              className="admin-edit-eyebrow"
            >

              VELMIRA ADMIN

            </span>


            <h1>
              Edit Product
            </h1>


            <p>

              Update your product information and
              keep your store looking beautiful.

            </p>

          </div>


          <button
            type="button"
            className="admin-edit-back"
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
          >

            ← Back to Products

          </button>

        </div>


        {/* ======================================================
            SUCCESS
        ====================================================== */}

        {message && (

          <div
            className="admin-edit-message success-message"
          >

            ✓ {message}

          </div>

        )}


        {/* ======================================================
            ERROR
        ====================================================== */}

        {error && (

          <div
            className="admin-edit-message error-message"
          >

            {error}

          </div>

        )}


        {/* ======================================================
            MAIN EDIT CARD
        ====================================================== */}

        <div
          className="admin-edit-card"
        >


          {/* ====================================================
              LEFT - PRODUCT PREVIEW
          ==================================================== */}

          <div
            className="admin-edit-preview"
          >


            <div
              className="admin-edit-preview-heading"
            >

              <span>
                PRODUCT PREVIEW
              </span>

            </div>


            {/* ==================================================
                IMAGE
            ================================================== */}

            <div
              className="admin-edit-image-wrapper"
            >

              {formData.image ? (

                <img
                  src={
                    getImageUrl(
                      formData.image
                    )
                  }
                  alt={
                    formData.name ||
                    "Product"
                  }
                  onError={(
                    event
                  ) => {

                    event.currentTarget.style.display =
                      "none";

                  }}
                />

              ) : (

                <div
                  className="admin-edit-no-image"
                >

                  No Image

                </div>

              )}

            </div>


            {/* ==================================================
                PRODUCT DETAILS
            ================================================== */}

            <div
              className="admin-edit-product-details"
            >


              <span
                className="admin-edit-category"
              >

                {formData.category ||
                  "Product"}

              </span>


              <h2>

                {formData.name ||
                  "Product Name"}

              </h2>


              <p
                className="admin-edit-price"
              >

                ₦

                {Number(
                  formData.price ||
                  0
                ).toLocaleString()}

              </p>


              <div
                className="admin-edit-meta"
              >

                <span>

                  ★ {formData.rating}/5

                </span>


                {formData.badge && (

                  <span
                    className="admin-edit-badge"
                  >

                    {formData.badge}

                  </span>

                )}

              </div>

            </div>

          </div>


          {/* ====================================================
              RIGHT - EDIT FORM
          ==================================================== */}

          <div
            className="admin-edit-form-section"
          >


            <div
              className="admin-edit-form-heading"
            >

              <span>
                PRODUCT DETAILS
              </span>


              <h2>
                Edit Product Information
              </h2>


              <p>
                Make changes to your product below.
              </p>

            </div>


            <form
              onSubmit={
                handleSubmit
              }
            >


              {/* ==================================================
                  PRODUCT NAME
              ================================================== */}

              <div
                className="admin-edit-form-group admin-edit-full"
              >

                <label htmlFor="name">
                  Product Name
                </label>


                <input
                  id="name"
                  name="name"
                  type="text"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="e.g. Luxury Handbag"
                  required
                />

              </div>


              {/* ==================================================
                  PRICE + CATEGORY
              ================================================== */}

              <div
                className="admin-edit-two-columns"
              >


                {/* PRICE */}

                <div
                  className="admin-edit-form-group"
                >

                  <label htmlFor="price">
                    Price
                  </label>


                  <div
                    className="admin-price-wrapper"
                  >

                    <span>
                      ₦
                    </span>


                    <input
                      id="price"
                      name="price"
                      type="number"
                      value={
                        formData.price
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="35000"
                      min="0"
                      required
                    />

                  </div>

                </div>


                {/* CATEGORY */}

                <div
                  className="admin-edit-form-group"
                >

                  <label htmlFor="category">
                    Category
                  </label>


                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={
                      formData.category
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. Bags"
                    required
                  />

                </div>

              </div>


              {/* ==================================================
                  IMAGE
              ================================================== */}

              <div
                className="admin-edit-form-group admin-edit-full"
              >

                <label htmlFor="image">
                  Image Path
                </label>


                <input
                  id="image"
                  name="image"
                  type="text"
                  value={
                    formData.image
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="/images/products/bag1.jpg"
                  required
                />


                <small>
                  Enter the path to the product image.
                </small>

              </div>


              {/* ==================================================
                  BADGE + RATING
              ================================================== */}

              <div
                className="admin-edit-two-columns"
              >


                {/* BADGE */}

                <div
                  className="admin-edit-form-group"
                >

                  <label htmlFor="badge">
                    Badge
                  </label>


                  <select
                    id="badge"
                    name="badge"
                    value={
                      formData.badge
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="">
                      No Badge
                    </option>


                    <option value="New">
                      New
                    </option>


                    <option value="Hot">
                      Hot
                    </option>


                    <option value="Sale">
                      Sale
                    </option>


                    <option value="Popular">
                      Popular
                    </option>


                    <option value="Trending">
                      Trending
                    </option>

                  </select>

                </div>


                {/* RATING */}

                <div
                  className="admin-edit-form-group"
                >

                  <label htmlFor="rating">
                    Rating
                  </label>


                  <select
                    id="rating"
                    name="rating"
                    value={
                      formData.rating
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="1">
                      1
                    </option>


                    <option value="2">
                      2
                    </option>


                    <option value="3">
                      3
                    </option>


                    <option value="4">
                      4
                    </option>


                    <option value="5">
                      5
                    </option>

                  </select>

                </div>

              </div>


              {/* ==================================================
                  ACTIONS
              ================================================== */}

              <div
                className="admin-edit-actions"
              >


                <button
                  type="button"
                  className="admin-edit-cancel"
                  onClick={() =>
                    navigate(
                      "/admin/products"
                    )
                  }
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="admin-edit-submit"
                >

                  Update Product

                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}


export default AdminEditProduct;