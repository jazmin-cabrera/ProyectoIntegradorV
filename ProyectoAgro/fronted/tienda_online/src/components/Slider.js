import React from 'react';
import '../styles/estilo.css';

const Slider = () => {
  return (
    <div className="contenedor-slider">
      <div className="slider">
        <div className="slide active">
          <img src="/img/1.jpeg" alt="Slide 1" />
        </div>
      </div>
    </div>
  );
};

export default Slider;