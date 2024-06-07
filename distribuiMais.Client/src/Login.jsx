import React, { useState } from "react";
import "./public/css/Login.css";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import api from "./services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const json = {
            email: email,
            senhaHash: password
        };
        console.log(json);
        api.post("login", json).then(async (response) => {
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
        });
    };

    return (
        <>
            <div className="login-div">
                <h1 className="login-title">Login</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Digite seu email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label htmlFor="password">Senha</label>
                    <div className="password-container">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            placeholder="Digite sua senha" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <span 
                            className="password-toggle-icon" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </>
    );
}

export default Login;
