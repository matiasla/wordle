import React from 'react';
import "./Header.scss";
import Swal from 'sweetalert2';

const Header = () => {

    let played = Number(localStorage.getItem("played"));
    let won = Number(localStorage.getItem("won"));
    let lose = Number(localStorage.getItem("lose"));

    // MUESTRA ESTADISTICAS
    const handleClickStatistics = () => {
        Swal.fire({
            title: '<strong>ESTADÍSTICAS</strong>',
            html: `
                <p>Partidas: ${played}</p>
                <p>Ganadas: ${won}</p>
                <p>Perdidas: ${lose}</p>
            `,
            background: '#121213',
            color: '#FFFFFF',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: "#818384",
        })
    }

    // MUESTRA REGLAS DEL JUEGO
    const handleClickRules = () => {
        Swal.fire({
            title: '<strong>CÓMO JUGAR</strong>',
            html: `
                <p>Adivina la PALABRA.</p><br/>
                <p>Cada conjetura debe ser una palabra válida. Pulse el botón Intro para enviar.</p><br/>
                <p>Después de cada suposición, el color de las fichas cambiará para mostrar qué tan cerca estuvo su suposición de la palabra.</p><br/>
            `,
            background: '#121213',
            color: '#FFFFFF',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: "#818384",
        })
    }

    return (
        <div className="header">
            <div className="menu">
                <span onClick={handleClickRules} className='menu__rules'><i className="far fa-question-circle"></i></span>
                <h1 className='menu__title'>Wordle</h1>
                <span onClick={handleClickStatistics} className='menu__statistics'><i className="fas fa-chart-area"></i></span>
            </div>
        </div>
    )
}

export default Header;