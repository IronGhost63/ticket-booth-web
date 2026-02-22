import Cookies from "js-cookie";
import constant from "./constant";

const baseURL = constant.API_URL;
const apiToken = Cookies.get('token');

const validateToken = async () => {
  try {
    const response = await fetch(`${baseURL}/auth/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      }
    });

    if ( !response.ok ) {
      Cookies.remove('token');
    } else {
      const result = await response.json();

      Cookies.set('role', result.role);
    }
  } catch ( error ) {
    Cookies.remove('token');
    Cookies.remove('role');
  }
}

export const isLoggedIn = () => {
  validateToken();

  const token = Cookies.get('token');

  return !!token;
}

export const isAdmin = () => {
  validateToken();

  const role = Cookies.get('role');

  return (role === 'admin');
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

    const now = new Date();
    const expiration = new Date(now.getTime() + data.tokenExpire);

    Cookies.set("token", data.accessToken, {
      secure: true,
      expires: expiration
    });

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

  async createConcert(name, description, totalSeats, date, cover) {

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
  },

  async getUserTickets() {
    try {
      const response = await fetch(`${baseURL}/ticket`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`
        }
      });

      return response.json();
    } catch( error ) {
      throw new Error(error.message)
    }
  },

  async getStats() {
    try {
      const response = await fetch(`${baseURL}/stats`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`
        }
      });

      return response.json();
    } catch( error ) {
      throw new Error(error.message)
    }
  },

  async cancelTicket(ticketId) {

  },

  async cancelAllTicket() {

  },

  async deleteConcert( concertId ) {
    const response = await fetch(`${baseURL}/concert/${concertId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
  }
}

export default API
