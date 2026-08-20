import {
  createContext,
  useContext,
  useState
} from "react";

import {
  saveToken,
  getToken,
  removeToken
} from "../api/auth";


const AuthContext =
  createContext();


export const AuthProvider = ({
  children
}) => {


  // ============================
  // TOKEN
  // ============================

  const [token, setToken] =
    useState(getToken());


  // ============================
  // SAVED USER
  // ============================

  const getSavedUser = () => {

    const savedUser =
      localStorage.getItem("user");


    if (!savedUser) {
      return null;
    }


    try {

      return JSON.parse(
        savedUser
      );

    } catch (error) {

      console.error(
        "Failed to read saved user:",
        error
      );

      return null;

    }

  };


  const [user, setUser] =
    useState(
      getSavedUser()
    );


  // ============================
  // LOGIN
  // ============================

  const login = (
    newToken,
    userData
  ) => {

    saveToken(newToken);


    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );


    setToken(newToken);

    setUser(userData);

  };


  // ============================
  // LOGOUT
  // ============================

  const logout = () => {

    removeToken();


    localStorage.removeItem(
      "user"
    );


    setToken(null);

    setUser(null);

  };


  // ============================
  // AUTH VALUES
  // ============================

  return (

    <AuthContext.Provider
      value={{

        token,

        user,

        login,

        logout,

        isAuthenticated:
          !!token,

        isAdmin:
          user?.isAdmin === true

      }}
    >

      {children}

    </AuthContext.Provider>

  );

};


// ============================
// CUSTOM HOOK
// ============================

export const useAuth = () => {

  return useContext(
    AuthContext
  );

};
