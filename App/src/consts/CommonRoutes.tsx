import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Pages/Home/Home";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Products from "../components/Pages/Products/Index";
import ProductDetail from "../components/Pages/Products/Detail";
import ROUTES from "./Routes";
import { User } from "../core/modules/auth/auth.types";

interface CommonRoutesProps {
  handleLogin: (user: User, token: string, refreshtoken: string) => void;
}

const CommonRoutes: React.FC<CommonRoutesProps> = ({ handleLogin }) => (
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

export default CommonRoutes;
