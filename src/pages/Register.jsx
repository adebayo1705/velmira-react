import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import { registerUser } from "../api/authApi";

import "../styles/login.css";


function Register() {

  const navigate = useNavigate();


  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // ============================
  // REGISTER
  // ============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      const data =
        await registerUser(
          name,
          email,
          password
        );


      console.log(
        "REGISTER RESPONSE:",
        data
      );


      navigate("/login");

    } catch (error) {

      console.error(
        "REGISTER ERROR:",
        error
      );

      setError(
        error.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <main className="login-page">

      <div className="login-container">

        <div className="login-content">


          {/* ============================
              HEADING
          ============================ */}

          <h1>
            Create Your Account
          </h1>

          <p>
            Join Velmira and discover our collection.
          </p>


          {/* ============================
              ERROR
          ============================ */}

          {error && (

            <div className="login-error">
              {error}
            </div>

          )}


          {/* ============================
              FORM
          ============================ */}

          <form
            onSubmit={handleSubmit}
          >


            {/* NAME */}

            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="Enter your name"
                autoComplete="name"
                required
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="Enter your email"
                autoComplete="email"
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>


              <div className="password-input-wrapper">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength="6"
                  required
                />


                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                  }

                </button>

              </div>

            </div>


            {/* CREATE ACCOUNT BUTTON */}

            <button
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : "Create Account"
              }

            </button>


          </form>


          {/* ============================
              LOGIN LINK
          ============================ */}

          <p className="login-switch">

            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>

          </p>


        </div>

      </div>

    </main>

  );

}


export default Register;
