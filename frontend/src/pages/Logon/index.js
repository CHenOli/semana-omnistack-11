import React, { useState } from 'react';

import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import logo from "../../assets/logo.svg";
import heroesImage from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ong_id', id);
      localStorage.setItem('ong_name', response.data.name);

      history.push('/profile')
    } catch (e) {
      alert('Erro ao buscar os dados, verifique o ID e tente novamente!')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)} />
          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            não tenho cadastro!
          </Link>
        </form>

      </section>

      <img src={heroesImage} alt="Heroes" />
    </div>
  )
}
