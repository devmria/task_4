import axios from "axios";

const VITE_CORE_SERVER_URL = import.meta.env["VITE_CORE_SERVER_URL"];

export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const res = await axios.post(
        `${VITE_CORE_SERVER_URL}/api/login`,
        { email, password },
        { withCredentials: true }
      );
      return res.data;
    } catch (err: any) {
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
  
      if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
  
      if (err.request) {
        throw new Error("Server did not respond.");
      }
  
      throw new Error("Login failed. Please try again.");
    }
  },

  register: (name: string, email: string, password: string) => {
    return axios
      .post(`${VITE_CORE_SERVER_URL}/api/register`, { name, email, password }, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response?.data?.error || "Registration failed";
      });
  },

  logout: () => {
    return axios.post(`${VITE_CORE_SERVER_URL}/api/logout`, {}, { withCredentials: true });
  }
};