import API_URL from "./api";


// ================================
// REGISTER USER
// ================================

export const registerUser = async (
  name,
  email,
  password
) => {

  const response = await fetch(
    `${API_URL}/users/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name,
        email,
        password
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(
      data.message || "Registration failed"
    );

  }

  return data;
};


// ================================
// LOGIN USER
// ================================

export const loginUser = async (
  email,
  password
) => {

  const response = await fetch(
    `${API_URL}/users/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email,
        password
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(
      data.message || "Login failed"
    );

  }

  return data;
};
