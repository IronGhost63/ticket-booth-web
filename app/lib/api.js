import Cookies from "js-cookie";
import constant from "./constant";

const baseURL = constant.API_URL;

const validateToken = async () => {
  try {
    const apiToken = Cookies.get('token');

    if ( !apiToken ) {
      return;
    }

    const response = await fetch(`${baseURL}/auth/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      }
    });

    const result = await response.json();

    Cookies.set('role', result.role);
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
    try {
      const apiToken = Cookies.get('token');
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('totalSeats', totalSeats);
      formData.append('date', date);

      const response = await fetch(`${baseURL}/concert`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
        },
        body: formData
      });

      return await response.json();
    } catch( error ) {
      throw new Error(error.message);
    }
  },

  async getAllConcerts() {
    const response = await fetch(`${baseURL}/concert`);
    const data = await response.json();

    return data;
  },

  async getConcert( concertId ) {
    const apiToken = Cookies.get('token');
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
      const apiToken = Cookies.get('token');
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
      const apiToken = Cookies.get('token');
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
      const apiToken = Cookies.get('token');
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
    try {
      const apiToken = Cookies.get('token');
      const response = await fetch(`${baseURL}/concert/${concertId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiToken}`
        }
      });

      return await response.json();
    } catch ( error ) {
      throw new Error(error.message)
    }
  }
}

export default API
