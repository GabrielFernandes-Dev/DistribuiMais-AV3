import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RegisterDrug from './RegisterDrug.jsx'
import ManageDrug from './ManageDrug.jsx'
import './public/css/index.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}/>
            <Route path='/medicamento/novo' element={<RegisterDrug />}/>
            <Route path='/medicamento/editar' element={<ManageDrug />}/>
            <Route path='/login' element={<Login />}/>
        </Routes>
    </BrowserRouter>
)
