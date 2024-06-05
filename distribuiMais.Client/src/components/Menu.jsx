import React from 'react';
import '../public/css/Menu.css';
import { Link } from 'react-router-dom';

const Menu = () => {
  const user = localStorage.getItem('user');

  return (
    <>
    <div className="navbar">
      <div>
        <Link to="/">
          <a><img src="/src/assets/logo.png" className="navbar-logo" alt='Distribuimais'/></a>
        </Link>
      </div>
      <div>
        <a href="#">Sobre</a>
        <a href="#">Serviços</a>
        <Link to="/medicamento/novo">Novo medicamento</Link>
        <Link to="/medicamento/editar">Gerenciar medicamentos</Link>
      </div>
      <div style={{ marginBottom: '.5rem' }}>
        {user ? (
          <>
            <a>Olá, {user[0].toUpperCase() + user.substring(1)}</a>
            <a>|</a>
            <a href="" onClick={() => localStorage.removeItem('user')}> Sair</a>
          </>
        ) : (
          <>
            <button style={{background: "#A051C4"}}>
              <Link to="/login">Entrar</Link>
            </button>
            <a href="">Cadastre-se</a>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Menu;