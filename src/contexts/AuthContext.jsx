import api from "../api";
import { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/auth/profile"); // plus besoin de headers
      const userData = response.data.data.user; // vérifie la structure exacte
      setUser(userData);
      setCart(userData.cart || []);
    } catch (error) {
      console.error("Impossible de récupérer le profil :", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", { name, email, password });
      const { token: newToken, user: newUser } = response.data.data; // selon ta structure API
      localStorage.setItem("token", newToken);
      setUser(newUser);
      setToken(newToken);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Une erreur est survenue",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token: newToken, user: newUser } = response.data.data; // selon API
      localStorage.setItem("token", newToken);
      setUser(newUser);
      setToken(newToken);

      return { success: true, message: "Connexion réussie" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Une erreur est survenue",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setCart([]);
  };

  const isAuthenticated = () => !!token;

  const addToCart = (product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (productId) => setCart((prev) => prev.filter((item) => item.id !== productId));
  const updateProfile = (updatedUser) => setUser(updatedUser);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, cart, register, login, logout, isAuthenticated, addToCart, removeFromCart, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
