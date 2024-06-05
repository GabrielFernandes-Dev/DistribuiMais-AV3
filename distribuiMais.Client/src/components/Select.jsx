// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../public/css/Select.css";
// eslint-disable-next-line react/prop-types
const Select = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState("");

  if (!Array.isArray(options)) {
    console.error("Options is not an array:", options);
    return null;
  }

  return (
    <div className="box-select">
      <div className="select">
        <div>
        <label className="label">
          {label}
        </label>  
        </div>
          <div className="select-container">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="" disabled hidden></option>
              {options.map((option, index) => (
                <option key={index} value={option.nome}>
                  {option.nome}
                </option>
              ))}
            </select>
          </div>
      </div>
    </div>
  );
};

export default Select;
