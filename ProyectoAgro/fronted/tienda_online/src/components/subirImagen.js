import React, { useState } from 'react';
import './SubirImagen.css'

const SubirImagen = ({ articuloId, onImageUpload }) => {
    const [imagen, setImagen] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagen) {
            setError("Por favor, selecciona una imagen.");
            return;
        }

        const formData = new FormData();
        formData.append('archivo0', imagen);  // Cambiamos a "archivo0" para coincidir con tu ruta

        try {
            const response = await fetch(`http://localhost:3900/api/subir-imagen/${articuloId}`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setMensaje(result.mensaje);
                setError("");
                onImageUpload(); // Llama a la función para redirigir después de subir la imagen
            } else {
                setError(result.mensaje || "Error al subir la imagen.");
                setMensaje("");
            }
        } catch (err) {
            setError("Hubo un problema con la subida de la imagen.");
            setMensaje("");
        }
    };

    return (
        <div>
            <h2>Subir Imagen</h2>
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} className='subir-imagen-container'>
                <input type="file" onChange={handleFileChange} accept="image/*" />
                <button type="submit" className='subirImagen'>Subir Imagen</button>
            </form>
        </div>
    );
};

export default SubirImagen;
