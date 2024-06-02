import "./App.css";
import { Route } from "react-router-dom";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import ROUTES from "./consts/Routes";
import AuthContainer from "./components/Context/AuthContainer";

function App() {
  return (
    <AuthContainer>
      <Route path={ROUTES.dashboard} element={<Dashboard />} />
    </AuthContainer>
  );
}

export default App;
