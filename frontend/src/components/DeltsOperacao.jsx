import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import './css/Perfil.css';

const DeltsOperacao = forwardRef((props, ref) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const operacoes = JSON.parse(localStorage.getItem('operacoes')) || [];
    const index = parseInt(id);
    const op = operacoes[index];
    if (!op) {
      alert('Operação não encontrada.');
      navigate('/inicio');
    } else {
      setForm(op);
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const salvar = () => {
    const operacoes = JSON.parse(localStorage.getItem('operacoes')) || [];
    const index = parseInt(id);
    if (!form) {
      alert('Erro ao salvar: formulário vazio.');
      return;
    }
    operacoes[index] = { ...operacoes[index], ...form };
    localStorage.setItem('operacoes', JSON.stringify(operacoes));
    alert('Operação atualizada com sucesso!');
    navigate('/inicio');
  };

  useImperativeHandle(ref, () => ({
    salvar
  }));

  if (!form) return null;

  return (
    <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '13em' }}>
      <h2>Editar Operação</h2>

      <div className='camp_input'>
        <label>Data</label>
        <input type="text" name="data" value={form.data} onChange={handleChange} />
      </div>

      <div className='camp_input'>
        <label>Talhão</label>
        <input type="text" name="talhao" value={form.talhao} onChange={handleChange} />
      </div>

      <div className='camp_input'>
        <label>Descrição</label>
        <textarea name="descricao" value={form.descricao} onChange={handleChange} />
      </div>

      <h2>Dados Adicionais de Campo</h2>

      <div className='camp_input'>
        <label>Chuvas</label>
        <input type="text" name="chuvas" value={form.chuvas} onChange={handleChange} />
      </div>

      <div className='camp_input'>
        <label>Custo da Operação</label>
        <input type="text" name="custo" value={form.custo} onChange={handleChange} />
      </div>

      <div className='camp_input'>
        <label>Saúde da Cultura</label>
        <input type="text" name="saude" value={form.saude} onChange={handleChange} />
      </div>

      <div className='camp_input'>
        <label>Horas de Uso do Trator</label>
        <input type="text" name="horasTrator" value={form.horasTrator} onChange={handleChange} />
      </div>

      <div className='camp_input'>
        <label>Volume de Pulverização</label>
        <input type="text" name="volume" value={form.volume} onChange={handleChange} />
      </div>

      <div className='camp_input'>
        <label>Umidade do Solo</label>
        <input type="text" name="umidade" value={form.umidade} onChange={handleChange} />
      </div>

      <div className='camp_input'>
        <label>Temperatura do Ar</label>
        <input type="text" name="temperatura" value={form.temperatura} onChange={handleChange} />
      </div>
    </div>
  );
});

export default DeltsOperacao;