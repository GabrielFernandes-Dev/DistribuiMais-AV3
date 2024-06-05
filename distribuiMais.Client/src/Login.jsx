import React, { useState } from "react";
import Menu from "./components/Menu";
import "./public/css/Login.css";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import api from "./services/api";
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault()

        const json = {
            email: email,
            senhaHash: password
        }
        console.log(json)
        api.post("login", json).then( async (response) => {
            console.log(response.data);
            localStorage.setItem('user', email.split('@')[0]);
            await Swal.fire({
                icon: "success",
                title: `Bem vindo(a) ${localStorage.getItem('user')}!`,
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/');

        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Verifique suas credenciais!",
              });

              setPassword("");
        })
    }
    return (
        <>
            <Menu />
            <div className="login-div">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </>
    );
}

export default Login;