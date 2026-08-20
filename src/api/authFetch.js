import API_URL from "./api";

const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  console.log("============================");
  console.log("AUTH FETCH");
  console.log("URL:", `${API_URL}${endpoint}`);
  console.log("Token exists:", !!token);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("RESPONSE STATUS:", response.status);

    const text = await response.text();

    console.log("RAW RESPONSE:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Server returned an invalid response.");
    }

    console.log("PARSED RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;

  } catch (error) {
    console.error("AUTH FETCH ERROR:", error);

    throw error;
  }
};

export default authFetch;