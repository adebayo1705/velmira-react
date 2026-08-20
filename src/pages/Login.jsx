import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

import "../styles/login.css";


function Login() {

  const navigate = useNavigate();

  const location = useLocation();

  const from =
    location.state?.from || "/home";

  const { login } = useAuth();


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
  // LOGIN
  // ============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      const data =
        await loginUser(
          email,
          password
        );


      login(
        data.token,
        data.user
      );


      navigate(
        from,
        {
          replace: true
        }
      );

    } catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );

      setError(
        error.message ||
        "Login failed"
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
            Welcome Back
          </h1>

          <p>
            Login to your Velmira account.
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
                  setEmail(e.target.value)
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
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


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Logging in..."
                : "Login"
              }

            </button>


          </form>


          {/* ============================
              REGISTER LINK
          ============================ */}

          <p className="login-switch">

            Don't have an account?{" "}

            <Link to="/register">
              Create one
            </Link>

          </p>


        </div>

      </div>

    </main>

  );

}


export default Login;
