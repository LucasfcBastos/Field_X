import './css/BtnNote.css'

import icon from '../svg/ia.svg'

import { useNavigate } from 'react-router-dom'

function BotaoNote({ to = '/' }) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(to)
    }

    return (
        <div className={`btnIa`}>
            <button onClick={handleClick}>
                <img src={icon} />
            </button>
        </div>
    )
}

export default BotaoNote
