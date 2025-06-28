import './css/BtnAcao.css'

import { useNavigate } from 'react-router-dom'

function ButaoAcao({ icon, position = 'right', to = '/' }) {
  const navigate = useNavigate()

    return (
        <div className={`btn ${position}`}>
            <button onClick={() => navigate(to)}>
                <img src={icon} />
            </button>
        </div>
    )
}

export default ButaoAcao
