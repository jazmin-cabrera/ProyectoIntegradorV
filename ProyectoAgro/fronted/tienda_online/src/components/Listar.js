import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Listar.css';

const Listar = ({ role }) => { // Recibir el rol como prop
    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const response = await fetch('http://localhost:3900/api/aticulos');
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                const data = await response.json();
                setArticulos(data.articulos);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        fetchArticulos();
    }, []);

    // Filtrar artículos en base a la búsqueda
    const articulosFiltrados = articulos.filter(articulo =>
        articulo.titulo && articulo.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="listar-container">
            <h1>Productos Disponibles</h1>
            <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
            <div className="productos-grid">
                {articulosFiltrados.map((articulo) => (
                    <div className="producto-card" key={articulo._id}>
                        {/* Construcción de la URL para mostrar la imagen */}
                        {articulo.imagen && (
                            <img
                                src={`http://localhost:3900/api/imagen/${articulo.imagen}`}
                                alt={articulo.titulo}
                                className="producto-imagen"
                            />
                        )}
                        <h3 className="producto-titulo">{articulo.titulo}</h3>
                        <p className="producto-contenido">{articulo.contenido}</p>
                        {/* Mostrar el botón "Ver más" solo si el rol no es "usuario" */}
                        {role !== "user" && (
                            <Link to={`/aticulo/${articulo._id}`} className="producto-link">
                                Ver más
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            {articulosFiltrados.length === 0 && <p>No se encontraron productos que coincidan con la búsqueda.</p>}
        </div>
    );
};

export default Listar;
