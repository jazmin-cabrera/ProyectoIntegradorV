// Inicio.js
import React from 'react';
import './Inicio.css'


const Inicio = () => {
    return (
        <div className="inicio-container">
            <h1 className="bienvenido">¡Bienvenidos a nuestra tienda!</h1>
            <p className="descripcion">Aquí encontrarás los mejores productos agrónomos.</p>
            <p className="instrucciones">Explora nuestro catálogo o crea un nuevo artículo.</p>
        </div>
    );
};

export default Inicio;
