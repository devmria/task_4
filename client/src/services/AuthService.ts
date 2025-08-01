import axios from "axios";

const VITE_CORE_SERVER_URL = import.meta.env["VITE_CORE_SERVER_URL"];

export const AuthService = {
  login: (email: string, password: string) => {
    return axios
      .post(`${VITE_CORE_SERVER_URL}/login`, { email, password }, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response?.data?.error || "Login failed";
      });
  },

  register: (name: string, email: string, password: string) => {
    return axios
      .post(`${VITE_CORE_SERVER_URL}/register`, { name, email, password }, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response?.data?.error || "Registration failed";
      });
  },

  logout: () => {
    return axios.post(`${VITE_CORE_SERVER_URL}/logout`, {}, { withCredentials: true });
  }
};