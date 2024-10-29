import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Listar.css'

const Listar = () => {
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
        <div>
            <h1>Listar artículos</h1>
            <input
                type="text"
                placeholder="Buscar artículos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
            <ul>
                {articulosFiltrados.map((articulo) => (
                    <li key={articulo._id}>
                        <Link to={`/aticulo/${articulo._id}`}>{articulo.titulo}</Link>
                    </li>
                ))}
            </ul>
            {articulosFiltrados.length === 0 && <p>No se encontraron artículos que coincidan con la búsqueda.</p>}
        </div>
    );
};

export default Listar;
