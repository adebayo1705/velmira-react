import {
  Navigate,
  useLocation
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


// ============================
// ADMIN ROUTE
// ============================

function AdminRoute({ children }) {

  const {
    isAuthenticated,
    isAdmin
  } = useAuth();


  const location =
    useLocation();


  // ============================
  // NOT LOGGED IN
  // ============================

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname
        }}
        replace
      />
    );

  }


  // ============================
  // LOGGED IN BUT NOT ADMIN
  // ============================

  if (!isAdmin) {

    return (
      <Navigate
        to="/home"
        replace
      />
    );

  }


  // ============================
  // ADMIN
  // ============================

  return children;

}


export default AdminRoute;