const MostrarImagen = ({ fichero }) => {
    const url = `http://localhost:3900/api/imagen/${fichero}`; // Ajusta según sea necesario

    return (
        <div>
            <img src={url} alt="Artículo" />
        </div>
    );
};
