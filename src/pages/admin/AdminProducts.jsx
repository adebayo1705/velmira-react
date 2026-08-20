import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useToast } from "../../context/ToastContext";
import "../../styles/admin-products.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [productToDelete, setProductToDelete] = useState(null);

  const { showToast } = useToast();

  // ============================
  // GET PRODUCTS
  // ============================

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);

      setError(error.message);

      showToast(
        "Failed to load products",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // LOAD PRODUCTS
  // ============================

  useEffect(() => {
    fetchProducts();
  }, []);

  // ============================
  // OPEN DELETE MODAL
  // ============================

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  // ============================
  // CLOSE DELETE MODAL
  // ============================

  const handleCancelDelete = () => {
    setProductToDelete(null);
  };

  // ============================
  // DELETE PRODUCT
  // ============================

  const handleConfirmDelete = async () => {
    if (!productToDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product"
        );
      }

      // Remove product from screen
      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) =>
            product._id !== productToDelete._id
        )
      );

      // Close modal
      setProductToDelete(null);

      // Show success toast
      showToast(
        "Product deleted successfully!",
        "success"
      );

    } catch (error) {
      console.error(error);

      setProductToDelete(null);

      showToast(
        error.message ||
          "Failed to delete product",
        "error"
      );
    }
  };

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <div className="admin-products">
        <p>Loading products...</p>
      </div>
    );
  }

  // ============================
  // ERROR
  // ============================

  if (error) {
    return (
      <div className="admin-products">
        <p>{error}</p>
      </div>
    );
  }

  // ============================
  // PRODUCTS PAGE
  // ============================

  return (
    <div className="admin-products">

      {/* ============================
          PAGE HEADER
      ============================ */}

      <div className="admin-products-header">

        <div>

          <h1>
            Products
          </h1>

          <p>
            Manage the products in your
            Velmira store.
          </p>

        </div>


        {/* ============================
            HEADER ACTIONS
        ============================ */}

        <div className="admin-products-header-actions">

          <Link
            to="/admin"
            className="admin-products-back"
          >
            ← Back to Admin
          </Link>


          <Link
            to="/admin/products/add"
            className="admin-products-add"
          >
            + Add Product
          </Link>

        </div>

      </div>


      {/* ============================
          PRODUCTS GRID
      ============================ */}

      <div className="admin-products-grid">

        {products.map((product) => (

          <div
            className="admin-product-card"
            key={product._id}
          >

            {/* PRODUCT IMAGE */}

            <img
              src={product.image}
              alt={product.name}
            />


            {/* PRODUCT CONTENT */}

            <div className="admin-product-content">

              <h2>
                {product.name}
              </h2>


              {/* PRICE */}

              <p>
                ₦{product.price.toLocaleString()}
              </p>


              {/* CATEGORY */}

              <p>
                Category: {product.category}
              </p>


              {/* RATING */}

              <p>
                Rating: {product.rating}/5
              </p>


              {/* BADGE */}

              {product.badge && (
                <p>
                  Badge: {product.badge}
                </p>
              )}


              {/* ============================
                  PRODUCT ACTIONS
              ============================ */}

              <div className="admin-product-actions">

                {/* EDIT */}

                <Link
                  to={`/admin/products/edit/${product._id}`}
                >
                  Edit
                </Link>


                {/* DELETE */}

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteClick(product)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* ============================
          DELETE CONFIRMATION MODAL
      ============================ */}

      {productToDelete && (

        <div className="delete-modal-overlay">

          <div className="delete-modal">

            <h2>
              Delete Product?
            </h2>


            <p>
              Are you sure you want to delete{" "}
              <strong>
                {productToDelete.name}
              </strong>
              ?
            </p>


            <p>
              This action cannot be undone.
            </p>


            {/* MODAL ACTIONS */}

            <div className="delete-modal-actions">

              {/* CANCEL */}

              <button
                type="button"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>


              {/* CONFIRM DELETE */}

              <button
                type="button"
                onClick={handleConfirmDelete}
              >
                Delete Product
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminProducts;