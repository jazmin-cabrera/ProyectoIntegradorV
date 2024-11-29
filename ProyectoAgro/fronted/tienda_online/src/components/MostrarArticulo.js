// MostrarArticulo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SubirImagen from './subirImagen'; // Importa el componente SubirImagen
import './MostrarArticulo.css'; // Estilos actualizados

const MostrarArticulo = () => {
    const { id } = useParams(); // Obtener el ID del artículo de la URL
    const [articulo, setArticulo] = useState(null);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate(); // Hook para navegar a otras rutas

    useEffect(() => {
        const obtenerArticulo = async () => {
            try {
                const response = await axios.get(`http://localhost:3900/api/aticulo/${id}`);
                setArticulo(response.data.articulo);
            } catch (error) {
                console.error('Error al obtener el artículo:', error);
            } finally {
                setCargando(false);
            }
        };

        obtenerArticulo();
    }, [id]);

    const manejarSubirImagen = async (imagen) => {
        const formData = new FormData();
        formData.append('archivo0', imagen); // Usar "archivo0" como en el backend

        try {
            const response = await axios.post(`http://localhost:3900/api/subir-imagen/${id}`, formData);
            alert(response.data.mensaje || "Imagen subida con éxito");
            // Actualizar el artículo después de subir la imagen
            setArticulo((prevArticulo) => ({
                ...prevArticulo,
                imagen: response.data.articulo.imagen // Actualiza la imagen en el estado
            }));
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert("Hubo un problema al subir la imagen.");
        }
    };

    if (cargando) {
        return <div>Cargando...</div>;
    }

    if (!articulo) {
        return <div>No se encontró el artículo.</div>;
    }

    return (
        <div className="mostrar-articulo-container">
            <h1>{articulo.titulo}</h1>
            <p>{articulo.contenido}</p>
            {articulo.imagen && (
                <div className="imagen-container">
                    <img
                        src={`http://localhost:3900/api/imagen/${articulo.imagen}`}
                        alt={articulo.titulo}
                        className="mostrar-articulo-imagen"
                    />
                </div>
            )}
            <p><strong>Fecha:</strong> {new Date(articulo.fecha).toLocaleDateString()}</p>

            {/* Componente para subir imagen */}
            <SubirImagen articuloId={id} onImageUpload={manejarSubirImagen} />

            {/* Botones de editar y borrar */}
            <div className="botones-container">
    <button onClick={() => navigate(`/editar/${articulo._id}`)} className="editarImagen">
        Editar
    </button>
    <button onClick={() => navigate(`/borrar/${articulo._id}`)} className="borrarImagen">
        Borrar
    </button>
</div>

        </div>
    );
};

export default MostrarArticulo;
