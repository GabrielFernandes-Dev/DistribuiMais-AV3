import React from 'react';
import '../public/css/Menu.css';
import { Link } from 'react-router-dom';

const Menu = () => {
  const user = localStorage.getItem('user');

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/src/assets/logo.png" className="navbar-logo" alt='Distribuimais' />
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="#">Serviços</Link>
        <Link to="/medicamento/novo">Novo medicamento</Link>
        <Link to="/medicamento/editar">Gerenciar medicamentos</Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span>Olá, {user[0].toUpperCase() + user.substring(1)}</span>
            <span>|</span>
            <a href="" onClick={() => localStorage.removeItem('user')}> Sair</a>
          </>
        ) : (
          <Link to="/login" className="login-button">Entrar</Link>
        )}
      </div>
    </div>
  );
};

export default Menu;
