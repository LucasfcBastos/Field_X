import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação
import './css/Operacoes.css';

function ExibirRegistro() {
  const [operacoes, setOperacoes] = useState([]);
  const navigate = useNavigate(); // Inicializa o hook

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('operacoes')) || [];
    setOperacoes(dados);
  }, []);

  const temOperacoes = operacoes.length > 0;

  const handleClick = (id) => {
    navigate(`/inicio/view/${id}`);
  };

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
              <tr key={index} onClick={() => handleClick(index)} style={{ cursor: 'pointer' }}>
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