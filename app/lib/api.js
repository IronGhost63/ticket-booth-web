import Cookies from "js-cookie";
import constant from "./constant";

const baseURL = constant.API_URL;

export const isLoggedIn = () => {
  const token = Cookies.get("token");

  return !!token;
}

const API = {
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

  async register(name, email, password) {
    const response = await fetch(`${baseURL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },

  async getAllConcerts() {
    const response = await fetch(`${baseURL}/concert`);
    const data = await response.json();

    return data;
  },

  async getConcert( concertId ) {
    const concertResponse = await fetch(`${baseURL}/concert/${concertId}`);
    const detail = await concertResponse.json();

    const data = {
      detail: detail,
      availability: [],
    };

    if ( isLoggedIn() ) {
      const seatsResponse = await fetch(`${baseURL}/ticket/concert/${concertId}`);
      const availability = await seatsResponse.json();

      data.availability = availability;
    }

    return data;
  }
}

export default API
