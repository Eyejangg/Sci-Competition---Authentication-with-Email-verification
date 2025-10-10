import { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";
import TokenService from "../services/token.service";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);

  const signin = (user) => setUser(user);
  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  useEffect(() => {
    TokenService.setUser(user);
  }, [user]);
  function getUser() {
    const currentUser = TokenService.getUser();
    return currentUser;
  }
  return (
    <AuthContext.Provider value={{ user, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
