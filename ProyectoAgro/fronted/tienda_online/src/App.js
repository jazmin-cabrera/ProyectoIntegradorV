import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Listar from "./components/Listar";
import Crear from "./components/Crear";
import MostrarArticulo from "./components/MostrarArticulo";
import BorrarArticulo from "./components/BorrarArticulo";
import EditarArticulo from "./components/EditarArticulo";
import Inicio from "./components/Inicio";
import Slider from "./components/Slider";
import Tabs from "./components/Tabs";
import "./styles.css";

const Login = ({ onLogin }) => {
  return (
    <div className="contenedor-login">
      <Slider />
      <div className="contenedor-texto">
        <Tabs onLogin={onLogin} />
      </div>
    </div>
  );
};

const MainApp = ({ role, onLogout }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/aticulos">Productos</Link>
          </li>
          {role === "admin" && (
            <>
              <li>
                <Link to="/crear">Crear Producto</Link>
              </li>
              <li>
                <Link to="/admin">Panel de Admin</Link>
              </li>
            </>
          )}
          <li>
            <button className="logout-button" onClick={onLogout}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
      <Routes>
    <Route path="/" element={<Inicio />} />
    <Route path="/aticulos" element={<Listar role={role} />} /> {/* Pasar el rol */}
    <Route path="/aticulo/:id" element={<MostrarArticulo />} />
    {role === "admin" && (
        <>
            <Route path="/crear" element={<Crear />} />
            <Route path="/borrar/:id" element={<BorrarArticulo />} />
            <Route path="/editar/:id" element={<EditarArticulo />} />
            <Route path="/admin" element={<h1>Bienvenido, Administrador</h1>} />
        </>
    )}
</Routes>

    </>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("userRole");
    setIsAuthenticated(auth);
    setUserRole(role);
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route
            path="*"
            element={<Login onLogin={(role) => handleLogin(role)} />}
          />
        ) : (
          <Route
            path="*"
            element={<MainApp role={userRole} onLogout={handleLogout} />}
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
