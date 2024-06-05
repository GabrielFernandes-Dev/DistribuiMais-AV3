import { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import './public/css/ManageDrug.css';
import { generateAPIHandler, setInitialData } from "./utils/utils";
import arrowdown from './assets/arrowdown.svg';
import api from "./services/api";
function ManageDrug() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [dose, setDose] = useState(0);
  const [date, setDate] = useState();
  const [onSingleDrugPage, setOnSingleDrugPage] = useState(false);
  const [drugs, setDrugs] = useState([]);
  const selectRef = useRef(null);

  const handlePut = () => {
    const toPut = {
      estoque_idestoque: 1,
      marca: brand,
      nome: name,
      validade: date,
      doserecomendada: dose
    }
    console.log(toPut);
    api.put(`medicamento/${id}/`, toPut).then((response) => {
      console.log(response.data);
      alert(response.data);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }
  const handleDelete = () => {
    api.delete(`medicamento/${id}`).then((response) => {
      console.log(response.data);
      alert(response.data);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    setInitialData([generateAPIHandler("medicamento", setDrugs)])
  }, []);

  const selectDrug = (e) => {
    const selectedDrug = drugs.filter((drug) => drug.idmedicamento == e.target.value).shift();
    setId(selectedDrug.idmedicamento);
    setName(selectedDrug.nome);
    setBrand(selectedDrug.marca);
    setDate(selectedDrug.validade);
    setDose(selectedDrug.doserecomendada);
    setOnSingleDrugPage(true);
  }

  return drugs.length > 0 &&
    <div className="app-container">
      <Menu />
      {onSingleDrugPage ?
        <div className="drug-form">
          <h1>Insira as informações do medicamento</h1>
          <div className="drug-form-row">
            <label>Nome</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
          </div>
          <div className="drug-form-row">
            <label>Marca</label>
            <input value={brand} onChange={(e) => setBrand(e.target.value)} type="text" />
          </div>
          <div className="drug-form-row">
            <label>Dose recomendada</label>
            <input value={dose} onChange={(e) => setDose(e.target.value)} type="number" />
          </div>
          <div className="drug-form-row">
            <label>Validade</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" />
          </div>
          <div className="manage-drug-button-container">
            <button onClick={handlePut}>Salvar alterações</button>
            <button onClick={handleDelete} className="manage-drug-delete-button">Excluir do sistema</button>
          </div>
        </div>
        :
        <div>
          <h1>Escolha o medicamento.</h1>
          <div onClick={() => selectRef.current.click()} className="manage-drug-container">
            <select defaultValue={""} onChange={selectDrug} ref={selectRef} className="manage-drug-select">
              <option value="" disabled hidden></option>
              {drugs.map((option) => (
                <option key={option.idmedicamento} value={option.idmedicamento}>
                  {option.nome}
                </option>
              ))}
            </select>
            <img width={16} src={arrowdown} />
          </div>
        </div>
      }
    </div>


}

export default ManageDrug;