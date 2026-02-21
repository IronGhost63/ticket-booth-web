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
      const apiToken = Cookies.get('token');

      const seatsResponse = await fetch(`${baseURL}/ticket/concert/${concertId}/availability`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`
        }
      });

      const availability = await seatsResponse.json();

      data.availability = availability;
    }

    return data;
  },

  async reserveTicket( concertId, seatNumber ) {
    const apiToken = Cookies.get('token');

    try {
      const ticketResponse = await fetch(`${baseURL}/ticket`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ concertId, seatNumber }),
      });

      const ticketDetail = await ticketResponse.json();

      return ticketDetail;
    } catch ( error ) {
      throw new Error(error.message);
    }
  }
}

export default API
