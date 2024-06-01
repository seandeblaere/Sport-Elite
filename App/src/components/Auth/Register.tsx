import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login } from "../../core/modules/auth/auth.api";
import { User } from "../../core/modules/auth/auth.types";

interface LoginProps {
  onLogin: (user: User, token: string) => void;
}

const Register: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await register({ email, password, name, seller: isSeller });
      const loginResponse = await login({ email, password });
      const { user, token } = loginResponse.data;
      onLogin(user, token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isSeller}
            onChange={(e) => setIsSeller(e.target.checked)}
          />
          Register as seller
        </label>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
