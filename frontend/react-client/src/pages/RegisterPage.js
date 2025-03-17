import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch(`${api}/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ fullName, email, password })
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
          <h2>Регистрация</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleRegister}>
              <input type="text" placeholder="ФИО" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit">Зарегистрироваться</button>
          </form>
      </div>
  );
}

export default RegisterPage;