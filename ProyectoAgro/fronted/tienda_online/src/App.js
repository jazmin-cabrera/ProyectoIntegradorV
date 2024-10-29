// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Listar from './components/Listar';
import Crear from './components/Crear';
import MostrarArticulo from './components/MostrarArticulo';
import BorrarArticulo from './components/BorrarArticulo';
import EditarArticulo from './components/EditarArticulo';
import Inicio from './components/Inicio';
import './styles.css'; // Ajusta la ruta según donde hayas guardado el archivo


const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/crear">Crear Artículo</Link>
                    </li>
                    <li>
                        <Link to="/aticulos">Listar</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
            <Route  path="/" element={<Inicio/>}/>
            <Route path="/aticulo/:id" element={<MostrarArticulo />} />
                <Route path="/aticulos" element={<Listar />} />
                <Route path="/crear" element={<Crear />} />
                <Route path="/borrar/:id" element={<BorrarArticulo />} />
                <Route path="/editar/:id" element={<EditarArticulo />} />
            </Routes>
        </Router>
    );
};

export default App;
