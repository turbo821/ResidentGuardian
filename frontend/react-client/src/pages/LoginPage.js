import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch(`${api}/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
          });
          const data = await response.json();
          if (!data.success) throw new Error(data.message);
          login(data.token);
          navigate("/dashboard");
      } catch (err) {
          setError(err.message);
      }
  };

  return (
      <div>
          <h2>Вход</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit">Войти</button>
          </form>
      </div>
  );
}

export default LoginPage