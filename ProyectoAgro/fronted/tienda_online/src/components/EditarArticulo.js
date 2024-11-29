// EditarArticulo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarArticulo.css'

const EditarArticulo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerArticulo = async () => {
            try {
                const response = await axios.get(`http://localhost:3900/api/aticulo/${id}`);
                setTitulo(response.data.articulo.titulo);
                setContenido(response.data.articulo.contenido);
            } catch (error) {
                console.error('Error al obtener el artículo:', error);
            } finally {
                setCargando(false);
            }
        };

        obtenerArticulo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const articuloData = { titulo, contenido };

        try {
            await axios.put(`http://localhost:3900/api/articulo/${id}`, articuloData);
            alert('Artículo editado con éxito');
            navigate(`/aticulo/${id}`); // Redirigir a la página del artículo
        } catch (error) {
            console.error('Error al editar el artículo:', error);
            alert('No se pudo editar el artículo');
        }
    };

    if (cargando) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Editar Producto</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Título"
                    required
                />
                <textarea
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    placeholder="Contenido"
                    required
                />
                <button type="submit" class="guardarcambios">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarArticulo;
