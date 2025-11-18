import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [balanco, setBalanco] = useState({ receitas: 0, despesas: 0, total: 0 });
  const [gastos, setGastos] = useState([]);
  const [categoriasResumo, setCategoriasResumo] = useState([]);
  
  // Dados do Formulário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('Salário'); 
  const [tipo, setTipo] = useState('despesa'); // 'receita' ou 'despesa'

  useEffect(() => {
    carregarDashboard();
  }, []);

  const carregarDashboard = async () => {
    try {
      const resposta = await axios.get('http://localhost:3001/api/dashboard');
      setBalanco(resposta.data.balanco);
      setCategoriasResumo(resposta.data.gastosPorCategoria);
      if(resposta.data.ultimosLancamentos) {
        setGastos(resposta.data.ultimosLancamentos.reverse());
      }
    } catch (erro) {
      console.error("Erro:", erro);
    }
  };

  const adicionarLancamento = async (e) => {
    e.preventDefault();
    if (!descricao || !valor) return;

    try {
      await axios.post('http://localhost:3001/api/gasto', {
        descricao,
        valor: parseFloat(valor),
        categoria,
        tipo // Enviando o tipo para o backend
      });
      
      setDescricao('');
      setValor('');
      carregarDashboard();
    } catch (erro) {
      console.error("Erro ao salvar:", erro);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">MeuFinanceiro</div>
        <div className="usuario">Estudante</div>
      </header>

      <div className="conteudo">
        <div className="card saldo-card">
          <h3>Saldo disponível</h3>
          <h1>R$ {balanco.total.toFixed(2)}</h1>
          <div className="detalhes-saldo">
            <span style={{color: '#4caf50'}}>Entradas: R$ {balanco.receitas.toFixed(2)}</span>
            <br></br>
            <span style={{color: '#f44336'}}>Saídas: R$ {balanco.despesas.toFixed(2)}</span>
          </div>
        </div>

        <div className="card">
          <h3>Novo Lançamento</h3>
          <form onSubmit={adicionarLancamento} className="form-gasto">
            
            {/* Botões de Seleção de Tipo */}
            <div className="tipo-selecao">
              <button 
                type="button" 
                className={tipo === 'receita' ? 'btn-receita ativo' : 'btn-receita'}
                onClick={() => { setTipo('receita'); setCategoria('Salário'); }}
              >
                Entrada
              </button>
              <button 
                type="button" 
                className={tipo === 'despesa' ? 'btn-despesa ativo' : 'btn-despesa'}
                onClick={() => { setTipo('despesa'); setCategoria('Aluguel'); }}
              >
                Saída
              </button>
            </div>

            <input 
              type="text" 
              placeholder="Descrição" 
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Valor (R$)" 
              value={valor}
              onChange={e => setValor(e.target.value)}
            />
            
            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
              {tipo === 'receita' ? (
                 <option value="Salário">Salário</option>
              ) : (
                <>
                  <optgroup label="Moradia">
                    <option value="Aluguel">Aluguel</option>
                    <option value="Luz">Luz</option>
                  </optgroup>
                  <optgroup label="Lazer">
                    <option value="Streaming">Streaming</option>
                    <option value="Restaurante">Restaurante</option>
                  </optgroup>
                </>
              )}
            </select>
            
            <button type="submit" className="btn-submit">Confirmar</button>
          </form>
        </div>

        <div className="card">
          <h3>Histórico</h3>
          <ul className="lista-gastos">
            {gastos.map((item) => (
              <li key={item.id} className="item-gasto">
                <div className="icone-gasto">{item.tipo === 'receita' ? '💰' : '💸'}</div>
                <div className="info-gasto">
                  <strong>{item.descricao}</strong>
                  <small>{item.tipo.toUpperCase()}</small>
                </div>
                <div className="valor-gasto" style={{color: item.tipo === 'receita' ? '#4caf50' : '#f44336'}}>
                  {item.tipo === 'receita' ? '+' : '-'} R$ {item.valor.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;