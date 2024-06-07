// components/Select.js
import React from 'react';
import "../public/css/Select.css";

const Select = ({ label, options, onChange }) => {
  return (
    <div className="box-select">
      <label className="label">{label}</label>
      <div className="select-container">
        <select onChange={onChange}>
          <option value="">Selecione...</option>
          {options.map((option) => (
            <option key={option.iddestino} value={option.nome}>{option.nome}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
