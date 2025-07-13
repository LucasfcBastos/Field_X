import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import './css/Perfil.css';

const DeltsAtividades = forwardRef((props, ref) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [tipoSelecionado, setTipoSelecionado] = useState('');

  useEffect(() => {
    const dispositivos = JSON.parse(localStorage.getItem('dispositivos')) || [];
    const index = parseInt(id);
    const dispositivo = dispositivos[index];
    if (!dispositivo) {
      alert('Dispositivo não encontrado.');
      navigate('/inicio');
    } else {
      setForm(dispositivo);
      setTipoSelecionado(dispositivo.tipoDispositivo);
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
    const dispositivos = JSON.parse(localStorage.getItem('dispositivos')) || [];
    const index = parseInt(id);
    if (!form || !form.nome || !form.tipo || !form.fabricante || !form.talhao) {
      alert('Preencha os campos obrigatórios: Nome, Tipo, Fabricante e Talhão.');
      return;
    }

    dispositivos[index] = {
      ...dispositivos[index],
      tipoDispositivo: tipoSelecionado,
      ...form
    };
    localStorage.setItem('dispositivos', JSON.stringify(dispositivos));
    alert('Dispositivo atualizado com sucesso!');
    navigate('/inicio');
  };

  useImperativeHandle(ref, () => ({
    salvar
  }));

  if (!form) return null;

  return (
    <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '13em' }}>
      <h2>Editar Dispositivo</h2>

      {/* Botões para selecionar tipo */}
      <div style={{ display: 'flex', gap: '2em', marginBottom: '1em', justifyContent: 'center' }} className='dispor'>
        <button
          className={tipoSelecionado === 'sensor' ? 'ativo' : ''}
          onClick={() => setTipoSelecionado('sensor')}
          disabled
        >
          Sensor
        </button>
        <button
          className={tipoSelecionado === 'equipamento' ? 'ativo' : ''}
          onClick={() => setTipoSelecionado('equipamento')}
          disabled
        >
          Equipamento
        </button>
      </div>

      {/* Campos comuns */}
      <div className='camp_input'>
        <label>Nome*</label>
        <input type="text" name="nome" value={form.nome} onChange={handleChange} />
      </div>
      <div className='camp_input'>
        <label>Tipo*</label>
        <input type="text" name="tipo" value={form.tipo} onChange={handleChange} />
      </div>
      <div className='camp_input'>
        <label>Fabricante*</label>
        <input type="text" name="fabricante" value={form.fabricante} onChange={handleChange} />
      </div>
      <div className='camp_input'>
        <label>Talhão*</label>
        <input type="text" name="talhao" value={form.talhao} onChange={handleChange} />
      </div>

      {/* Campos específicos para SENSOR */}
      {tipoSelecionado === 'sensor' && (
        <>
          <h2>Dados do Sensor</h2>
          <div className='camp_input'>
            <label>Unidade de Medida</label>
            <input type="text" name="unidadeMedida" value={form.unidadeMedida} onChange={handleChange} />
          </div>
          <div className='camp_input'>
            <label>Intervalo de Coleta</label>
            <input type="text" name="intervaloColeta" value={form.intervaloColeta} onChange={handleChange} />
          </div>
          <div className='camp_input'>
            <label>Bateria</label>
            <input type="text" name="bateria" value={form.bateria} onChange={handleChange} />
          </div>
          <div className='camp_input'>
            <label>Conectividade</label>
            <input type="text" name="conectividade" value={form.conectividade} onChange={handleChange} />
          </div>
          <div className='camp_input'>
            <label>Status</label>
            <input type="text" name="status" value={form.status} onChange={handleChange} />
          </div>
        </>
      )}

      {/* Campos específicos para EQUIPAMENTO */}
      {tipoSelecionado === 'equipamento' && (
        <>
          <h2>Dados do Equipamento</h2>
          <div className='camp_input'>
            <label>Modelo</label>
            <input type="text" name="modelo" value={form.modelo} onChange={handleChange} />
          </div>
          <div className='camp_input'>
            <label>Ano de Fabricação</label>
            <input type="text" name="anoFabricacao" value={form.anoFabricacao} onChange={handleChange} />
          </div>
          <div className='camp_input'>
            <label>Horas de Uso</label>
            <input type="text" name="horasTrator" value={form.horasTrator} onChange={handleChange} />
          </div>
          <div className='camp_input'>
            <label>Volume de Pulverização</label>
            <input type="text" name="volume" value={form.volume} onChange={handleChange} />
          </div>
          <div className='camp_input'>
            <label>Conectividade</label>
            <input type="text" name="conectividade" value={form.conectividade} onChange={handleChange} />
          </div>
        </>
      )}
    </div>
  );
});

export default DeltsAtividades;