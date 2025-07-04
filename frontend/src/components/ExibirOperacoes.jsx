import { useEffect, useState } from 'react';
import './css/Operacoes.css';

function ExibirRegistro() {
  const [operacoes, setOperacoes] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('operacoes')) || [];
    setOperacoes(dados);
  }, []); // Executa uma vez quando o componente é carregado

  const temOperacoes = operacoes.length > 0;

  return (
    <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '7.7em' }}>
      <h2>Histórico de Operações</h2>

      {temOperacoes ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Talhão</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {operacoes.map((op, index) => (
              <tr key={index}>
                <td>{op.talhao}</td>
                <td>{op.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='Null'>Nenhuma operação registrada.</p>
      )}
    </div>
  );
}

export default ExibirRegistro;