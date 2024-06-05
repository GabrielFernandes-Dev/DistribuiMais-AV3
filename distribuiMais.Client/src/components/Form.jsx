import React from 'react';
import Select from './Select';

// eslint-disable-next-line react/prop-types
const FormComponent = ({ destination, medicine, quantity }) => {
  return (
    <div style={{ margin: "2rem" }}>
      <Select label="Destino" options={destination} />
      <Select label="Medicamento" options={medicine} />
      <Select label="Quantidade" options={quantity} />
      <div style={{margin: "2rem"}}>
        <button style={{marginRight: "1rem"}}>Atualizar</button>
        <button>Cancelar</button>
      </div>
    </div>
  );
};

export default FormComponent;