import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Pages/Dashboard//Dashboard";
import AuthContainer from "./components/Context/AuthContainer";

function App() {
  return (
    <AuthContainer>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthContainer>
  );
}

export default App;
