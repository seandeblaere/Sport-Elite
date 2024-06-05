import { useAuth } from "../../Context/AuthContainer";
import Header from "../../../components/Design/Header/Header";

const Dashboard = () => {
  const { user } = useAuth();

  if (user)
    return (
      <>
        <Header />
        <div>
          <h1>Welcome, {user.name}</h1>
        </div>
      </>
    );
};

export default Dashboard;
