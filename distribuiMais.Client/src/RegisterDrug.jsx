import { useState } from "react";
import Menu from "./components/Menu";
import './public/css/RegisterDrug.css';
import api from "./services/api";
/*
doserecomendada         "50"
estoque_idestoque           1
idmedicamento           1
marca           "EMS"
nome            "Losartana"
validade            "2024-05-28"
*/
function RegisterDrug() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [dose, setDose] = useState(0);
    const [date, setDate] = useState();
    const handlePost = (e) => {
        e.preventDefault();
        const toPost = {
            estoque_idestoque: 1,
            marca: brand,
            nome: name,
            validade: date,
            doserecomendada: dose
        }
        console.log(toPost);
        api.post("medicamento", toPost).then((response) => {
            console.log(response.data);
            alert(response.data);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="app-container">
            <Menu />
            <form className="drug-form" onSubmit={handlePost}>
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
                <button type="submit">Criar</button>
            </form>
        </div>
    );
}

export default RegisterDrug;