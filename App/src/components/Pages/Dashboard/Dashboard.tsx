import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../../core/modules/auth/auth.api";
import { getAuthToken } from "../../../core/storage/index";
import { User } from "../../../core/modules/auth/auth.types";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getAuthToken();
        if (token) {
          const response = await getCurrentUser();
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
    </div>
  );
};

export default Dashboard;
