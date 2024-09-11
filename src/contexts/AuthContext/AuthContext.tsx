import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corregido: sin llaves

interface AuthContextProps {
  isAuthenticated: boolean;
  user: { correo: string; rol: string; nombre: string } | null;
  login: (correo: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("token"));
  });
  const [isPrivateKeyCorrect, setIsPrivateKeyCorrect] =
    useState<boolean>(false);

  const [user, setUser] = useState<{
    correo: string;
    rol: string;
    nombre: string;
  } | null>(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: { correo: string; rol: string; nombre: string } =
        jwtDecode(token);
      return {
        correo: decoded.correo,
        rol: decoded.rol,
        nombre: decoded.nombre,
      };
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (correo: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        {
          correo,
          password,
        },
      );

      if (response.status === 200) {
        const { accessToken } = response.data;
        const decoded: { correo: string; rol: string; nombre: string } =
          jwtDecode(accessToken);
        setIsAuthenticated(true);
        setUser({
          correo: decoded.correo,
          rol: decoded.rol,
          nombre: decoded.nombre,
        });
        localStorage.setItem("token", accessToken);
        return true;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
