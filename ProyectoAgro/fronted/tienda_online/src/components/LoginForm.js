import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3900/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.usuario.role); // Aquí llamamos onLogin con el rol del usuario
      } else {
        setErrorMessage(data.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error de conexión con el servidor");
    }
  };

  return (
    <form className="formulario active" onSubmit={handleSubmit}>
      <div className="error-text">{errorMessage && <p>{errorMessage}</p>}</div>
      <input
        type="text"
        name="username"
        placeholder="Correo electrónico"
        value={formData.username}
        onChange={handleInputChange}
        autoComplete="off"
        className="input-text"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleInputChange}
        className="input-text"
      />
      <button type="submit" className="btn">
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
