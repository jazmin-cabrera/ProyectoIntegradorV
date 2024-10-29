// BorrarArticulo.js
import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BorrarArticulo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleBorrar = async () => {
        try {
            await axios.delete(`http://localhost:3900/api/aticulo/${id}`);
           // alert('Artículo borrado con éxito');
            navigate('/'); // Redirigir a la página principal
        } catch (error) {
            console.error('Error al borrar el artículo:', error);
            alert('No se pudo borrar el artículo');
        }
    };

    return (
        <div>
            <h1>¿Estás seguro de que deseas borrar este artículo?</h1>
            <button onClick={handleBorrar}className='borrarImagen'>Borrar Artículo</button>
        </div>
    );
};

export default BorrarArticulo;
