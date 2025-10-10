import api from "./api";
import tokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_API;
const register = async (userData) => {
  return api.post(`${API_URL}/signup`, userData);
};

const login = async (email, password) => {
  const response = await api.post(`${API_URL}/signin`, { email, password });

  if (!response.data.token) return response;

  tokenService.setUser(response.data);
  return response;
};

const logout = () => {
  tokenService.removeUser();
};

const AuthService = { register, login, logout };

export default AuthService;
