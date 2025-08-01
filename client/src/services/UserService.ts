import axios from "axios";

const VITE_CORE_SERVER_URL = import.meta.env["VITE_CORE_SERVER_URL"]  + "/api/users";

export const UserService = {
  getAll: async () => {
    const res = await axios.get(VITE_CORE_SERVER_URL, {
      withCredentials: true
    });
    return res.data;
  },

  deleteUser: async (id: string) => {
    const res = await axios.delete(`${VITE_CORE_SERVER_URL}/${id}`, {
      withCredentials: true
    });
    return res.data;
  },

  blockUser: async (id: string) => {
    const res = await axios.patch(`${VITE_CORE_SERVER_URL}/${id}/block`, {}, {
      withCredentials: true
    });
    return res.data;
  },

  unblockUser: async (id: string) => {
    const res = await axios.patch(`${VITE_CORE_SERVER_URL}/${id}/unblock`, {}, {
      withCredentials: true
    });
    return res.data;
  },

  getCurrentUser: async () => {
    const res = await axios.get(`${VITE_CORE_SERVER_URL}/current`, {
      withCredentials: true
    });
    return res.data;
  }
};
