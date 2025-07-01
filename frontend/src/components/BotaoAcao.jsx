import './css/BtnAcao.css'

import { useNavigate } from 'react-router-dom'

function ButaoAcao({ icon, position = 'right', to = '/', onClick }) {
    const navigate = useNavigate()

    function handleClick() {
        if (onClick) {
            onClick()
            navigate(to)
        } else {
            navigate(to)
        }
    }

    return (
        <div className={`btn ${position}`}>
            <button onClick={handleClick}>
                <img src={icon} />
            </button>
        </div>
    )
}

export default ButaoAcao
