import React from "react";
import LoginForm from "./LoginForm";

const Tabs = ({ onLogin }) => {
  return (
    <div className="contenedor-form">
      <h1 className="titulo">¡Bienvenido a Tienda Online agronoma!</h1>
      <p className="descripcion">
        Ingresa a tu cuenta para disfrutar de tus beneficios y de las mejores
        promociones que tenemos para ti.
      </p>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default Tabs;
