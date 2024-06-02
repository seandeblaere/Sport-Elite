import { useAuth } from "../../Context/AuthContainer";

const Dashboard = () => {
  const { user } = useAuth();

  if (user)
    return (
      <div>
        <h1>Welcome, {user.name}</h1>
      </div>
    );
};

export default Dashboard;
