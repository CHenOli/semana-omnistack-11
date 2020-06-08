import React, { useState } from 'react'

import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import logo from "../../assets/logo.svg";

export default function NewIncident() {
  const ongId = localStorage.getItem('ong_id');

  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  async function handleNewIncident(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push('/profile');
    } catch (e) {
      alert('Erro ao cadastrar, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente e encontre um herói que possa resolvê-lo.</p>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            voltar para o perfil
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)} />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)} />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
