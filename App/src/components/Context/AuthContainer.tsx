import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getCurrentUser } from "../../core/modules/auth/auth.api";
import { AuthContextType } from "./AuthContext.types";
import { User } from "../../core/modules/auth/auth.types";
import { getAuthToken, saveAuthToken } from "../../core/storage";
import { API } from "../../core/network/api";
import ROUTES from "../../consts/Routes";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../../components/Pages/Home/Home";
import Register from "../../components/Auth/Register";
import Login from "../../components/Auth/Login";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.interceptors.request.use((config) => {
      const token = getAuthToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    API.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    }

    async function fetchUser() {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const handleLogin = (user: User, token: string) => {
    setUser(user);
    saveAuthToken(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const handleLogout = () => {
    setUser(null);
    saveAuthToken(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const publicRoutes = (
    <Routes>
      <Route path={ROUTES.home} element={<Home />} />
      <Route path={ROUTES.login} element={<Login onLogin={handleLogin} />} />
      <Route
        path={ROUTES.register}
        element={<Register onLogin={handleLogin} />}
      />
    </Routes>
  );

  const protectedRoutes = (
    <AuthContext.Provider value={{ user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );

  return (
    <>
      {publicRoutes}
      {user && protectedRoutes}
    </>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContainer;
