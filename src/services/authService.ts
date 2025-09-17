import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

export const authService = {
  login: async (username: string, password: string) => {
    const { data } = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return data;
  },
  register: async (username: string, password: string) => {
    const { data } = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });
    return data;
  },
};
