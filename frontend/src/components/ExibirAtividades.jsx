import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação
import './css/Operacoes.css';

function ExibirRegistro() {
  const [dispositivos, setDispositivos] = useState([]);
  const navigate = useNavigate(); // Inicializa o hook

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('dispositivos')) || [];
    setDispositivos(dados);
  }, []);

  const temDispositivos = dispositivos.length > 0;

  const handleClick = (id) => {
    navigate(`/atividades/view/${id}`);
  };

  return (
    <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '7.7em' }}>
      <h2>Lista de Dispositivos</h2>

      {temDispositivos ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {dispositivos.map((di, index) => (
              <tr key={index} onClick={() => handleClick(index)} style={{ cursor: 'pointer' }}>
                <td>{di.tipo}</td>
                <td>{di.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='Null'>Nenhuma dispositivos registrada.</p>
      )}
    </div>
  );
}

export default ExibirRegistro;