import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { getCurrentUser } from "../../core/modules/auth/auth.api";
import { AuthContextType } from "./AuthContext.types";
import { User } from "../../core/modules/auth/auth.types";
import {
  getAuthToken,
  saveAuthToken,
  saveRefreshToken,
} from "../../core/storage";
import { API } from "../../core/network/api";
import ROUTES from "../../consts/Routes";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../../components/Pages/Home/Home";
import Register from "../../components/Auth/Register";
import Login from "../../components/Auth/Login";
import Products from "../../components/Pages/Products/Index";
import ProductDetail from "../../components/Pages/Products/Detail";
import Dashboard from "../../components/Pages/Dashboard/Dashboard";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = getAuthToken();
  const navigate = useNavigate();

  const isTokenValid = (token: string): boolean => {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        return true;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
    return false;
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token && isTokenValid(token)) {
        try {
          API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await getCurrentUser();
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUser(null);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleLogin = (user: User, token: string, refreshtoken: string) => {
    saveAuthToken(token);
    saveRefreshToken(refreshtoken);
    setUser(user);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (user.seller || user.admin) {
      navigate("/dashboard");
    } else {
      navigate("/products");
    }
  };

  const handleLogout = () => {
    setUser(null);
    saveAuthToken(null);
    delete API.defaults.headers.common["Authorization"];
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const commonRoutes = (
    <>
      <Route path={ROUTES.home} element={<Home />} />
      <Route path={ROUTES.login} element={<Login onLogin={handleLogin} />} />
      <Route
        path={ROUTES.register}
        element={<Register onLogin={handleLogin} />}
      />
      <Route path={ROUTES.products} element={<Products />} />
      <Route path={ROUTES.productDetail} element={<ProductDetail />} />
      <Route path={ROUTES.notFound} element={<Login onLogin={handleLogin} />} />
    </>
  );

  const userRoutes = (
    <>
      <Route path={ROUTES.shoppingCart} element={<ShoppingCart />} />
      <Route path={ROUTES.profile} element={<Profile />} />
    </>
  );

  const sellerAdminRoutes = (
    <>
      <Route path={ROUTES.dashboard} element={<Dashboard />} />
      <Route path={ROUTES.productCreate} element={<ProductCreate />} />
    </>
  );

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      <Routes>{children}</Routes>
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
