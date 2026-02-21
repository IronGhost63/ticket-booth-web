import Cookies from "js-cookie";
import constant from "./constant";

const baseURL = constant.API_URL;

export const isLoggedIn = () => {
  const token = Cookies.get("token");

  return !!token;
}

export default {
  async login(email, password) {
    const response = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    Cookies.set("token", data.accessToken, { secure: true });

    return data;
  },
}
