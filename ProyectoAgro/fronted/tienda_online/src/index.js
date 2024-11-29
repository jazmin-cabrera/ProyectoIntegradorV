// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Asegúrate de que la importación sea esta
import App from './App'; // Asegúrate de que la ruta sea correcta

// Crear un root usando createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Usamos root.render en lugar de ReactDOM.render
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
