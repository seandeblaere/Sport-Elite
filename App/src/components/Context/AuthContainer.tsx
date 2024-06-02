import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
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
import Products from "../../components/Pages/Products/Index";
import ProductDetail from "../../components/Pages/Products/Detail";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = getAuthToken();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          setIsLoading(true);
          API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await getCurrentUser();
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const handleLogin = (user: User, token: string) => {
    saveAuthToken(token);
    setUser(user);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const handleLogout = () => {
    setUser(null);
    saveAuthToken(null);
    delete API.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.login} element={<Login onLogin={handleLogin} />} />
        <Route
          path={ROUTES.register}
          element={<Register onLogin={handleLogin} />}
        />
        <Route path={ROUTES.products} element={<Products />} />
        <Route path={ROUTES.productDetail} element={<ProductDetail />} />
        <Route
          path={ROUTES.notFound}
          element={<Login onLogin={handleLogin} />}
        />
        {user && children}
      </Routes>
    </AuthContext.Provider>
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
