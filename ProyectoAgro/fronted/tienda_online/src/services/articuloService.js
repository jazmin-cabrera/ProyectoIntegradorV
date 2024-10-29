// src/services/articuloService.js
import axios from 'axios';

const API_URL = 'http://localhost:3900'; // Cambia esto según tu configuración

export const getArticulos = async () => {
    return await axios.get(`${API_URL}/api/articulos`);
};

export const getArticulo = async (id) => {
    return await axios.get(`${API_URL}/api/articulos/${id}`);
};

export const createArticulo = async (articulo) => {
    return await axios.post(`${API_URL}/api/articulos`, articulo);
};

export const updateArticulo = async (id, articulo) => {
    return await axios.put(`${API_URL}/api/articulos/${id}`, articulo);
};

export const deleteArticulo = async (id) => {
    return await axios.delete(`${API_URL}/api/articulos/${id}`);
};

export const buscarArticulos = async (busqueda) => {
    return await axios.get(`${API_URL}/api/articulos/buscar/${busqueda}`);
};
