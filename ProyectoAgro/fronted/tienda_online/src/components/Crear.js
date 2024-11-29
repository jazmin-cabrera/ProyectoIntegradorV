import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import SubirImagen from './subirImagen'; // Importa el componente SubirImagen
import './Crear.css'

const Crear = ({ onArticuloCreado }) => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [articuloId, setArticuloId] = useState(''); // Estado para almacenar el ID del artículo
    const [imagenUrl, setImagenUrl] = useState(''); // Estado para almacenar la URL de la imagen
    const navigate = useNavigate(); // Hook para la redirección

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        const articuloData = {
            titulo,
            contenido,
            // La imagen será subida después con el componente de subirImagen
        };

        try {
            const response = await axios.post('http://localhost:3900/api/crear', articuloData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Artículo creado:', response.data);
            setArticuloId(response.data.articulo._id); // Guarda el ID del artículo creado

            // Llamar a la función de callback si se ha pasado
            if (onArticuloCreado) {
                onArticuloCreado(response.data.articulo);
            }
        } catch (error) {
            console.error('Error al crear el artículo:', error.response ? error.response.data : error);
        }
    };

    // Función para manejar la subida de la imagen
    const handleImageUpload = (url) => {
        setImagenUrl(url); // Guardar la URL de la imagen subida
        navigate('/'); // Redirigir a la página principal después de subir la imagen
    };

    return (
        <div>
            <h1>Crear Producto</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Contenido"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    required
                />
                <button type="submit" className='subirImagen'>Crear Producto</button>
            </form>

            {/* Mostrar el componente de subir imagen solo si el artículo ya fue creado */}
            {articuloId && (
                <div>
                    <h2>Subir Imagen</h2>
                    <SubirImagen articuloId={articuloId} onImageUpload={handleImageUpload} />
                    {imagenUrl && (
                        <div>
                            <p>Imagen subida correctamente:</p>
                            <img src={`http://localhost:3900/api/imagen/${imagenUrl}`} alt="Imagen del artículo" />
                            
                        </div>
                        
                    )}
                </div>
            )}
        </div>
    );
};

export default Crear;
