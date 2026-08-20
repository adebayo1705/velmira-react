import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/admin-add-product.css";

function AdminAddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    badge: "",
    rating: 5,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "https://velmira-backend.onrender.com/api/products",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            rating: Number(formData.rating),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add product"
        );
      }

      setMessage("Product added successfully!");

      setFormData({
        name: "",
        price: "",
        category: "",
        image: "",
        badge: "",
        rating: 5,
      });

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);

    } catch (error) {
      console.error(error);

      setError(error.message);
    }
  };

  return (
    <div className="admin-add-product">

      <div className="admin-add-product-container">

        <div className="admin-add-header">

          <div>
            <h1>
              Add Product
            </h1>

            <p>
              Add a new product to the Velmira store.
            </p>
          </div>

          <button
            type="button"
            className="admin-add-back"
            onClick={() => navigate("/admin/products")}
          >
            ← Back to Products
          </button>

        </div>

        {message && (
          <div className="admin-add-message success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="admin-add-message error-message">
            {error}
          </div>
        )}

        <div className="admin-add-layout">

          <div className="admin-add-preview">

            <div className="admin-add-preview-header">
              <span>
                PRODUCT PREVIEW
              </span>
            </div>

            <div className="admin-add-image-wrapper">

              {formData.image ? (
                <img
                  src={formData.image}
                  alt={formData.name || "Product preview"}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="admin-add-image-placeholder">
                  <span>🛍️</span>

                  <p>
                    Product image preview
                  </p>
                </div>
              )}

            </div>

            <div className="admin-add-preview-details">

              <span className="admin-add-preview-category">
                {formData.category || "CATEGORY"}
              </span>

              <h2>
                {formData.name || "Product Name"}
              </h2>

              <div className="admin-add-preview-bottom">

                <strong>
                  {formData.price
                    ? `₦${Number(
                        formData.price
                      ).toLocaleString()}`
                    : "₦0"}
                </strong>

                <span className="admin-add-preview-rating">
                  ★ {formData.rating}
                </span>

              </div>

              {formData.badge && (
                <span className="admin-add-preview-badge">
                  {formData.badge}
                </span>
              )}

            </div>

          </div>

          <form
            className="admin-add-form"
            onSubmit={handleSubmit}
          >

            <div className="admin-add-form-header">

              <h2>
                Product Information
              </h2>

              <p>
                Enter the details for your new product.
              </p>

            </div>

            <div className="form-group">

              <label htmlFor="name">
                Product Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Luxury Handbag"
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="price">
                Price
              </label>

              <div className="admin-add-price-input">

                <span>
                  ₦
                </span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="35000"
                  min="0"
                  required
                />

              </div>

            </div>

            <div className="form-group">

              <label htmlFor="category">
                Category
              </label>

              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Bags"
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="image">
                Image Path
              </label>

              <input
                id="image"
                name="image"
                type="text"
                value={formData.image}
                onChange={handleChange}
                placeholder="/velmira-react/images/products/bag1.jpg"
                required
              />

              <small>
                Enter the path to the product image.
              </small>

            </div>

            <div className="admin-add-form-row">

              <div className="form-group">

                <label htmlFor="badge">
                  Badge
                </label>

                <select
                  id="badge"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
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

              <div className="form-group">

                <label htmlFor="rating">
                  Rating
                </label>

                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
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

            <div className="admin-add-actions">

              <button
                type="button"
                className="admin-add-cancel"
                onClick={() =>
                  navigate("/admin/products")
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-add-submit"
              >
                Add Product
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AdminAddProduct;
