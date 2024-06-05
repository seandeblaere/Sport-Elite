import React from "react";
import { Route } from "react-router-dom";
import ShoppingCart from "../components/Pages/ShoppingCart/ShoppingCart";
import Profile from "../components/Pages/Profile/Profile";
import ROUTES from "./Routes";
const UserRoutes: React.FC = () => (
  <>
    <Route path={ROUTES.shoppingCart} element={<ShoppingCart />} />
    <Route path={ROUTES.profile} element={<Profile />} />
  </>
);

export default UserRoutes;
