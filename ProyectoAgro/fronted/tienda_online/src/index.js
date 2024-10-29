// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Asegúrate de que la ruta a App.js sea correcta


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root') // Asegúrate de que haya un elemento con id="root" en tu index.html
);
