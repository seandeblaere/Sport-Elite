import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../components/Pages/Dashboard/Dashboard";
import ProductCreate from "../components/Pages/Products/Create";
import ROUTES from "./Routes";

const SellerAdminRoutes: React.FC = () => (
  <>
    <Route path={ROUTES.dashboard} element={<Dashboard />} />
    <Route path={ROUTES.productCreate} element={<ProductCreate />} />
  </>
);

export default SellerAdminRoutes;
