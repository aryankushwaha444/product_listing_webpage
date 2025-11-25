import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const register = ({ name, email, password }) => {
    const newUser = { name, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = ({ email, password }) => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (!saved) return { ok: false, message: "User not found" };
    if (saved.email === email && saved.password === password) {
      setUser(saved);
      return { ok: true };
    }
    return { ok: false, message: "Wrong email or password" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
