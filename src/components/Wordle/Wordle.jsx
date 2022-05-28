import React, { useState, useEffect } from 'react';
import WordleView from './WordleView';
import Swal from 'sweetalert2';
import { STATUS_GAME, WORDS } from '../../utils/constants';

const Wordle = () => {

    // ESTADOS 
    const completedWordsStorage = JSON.parse(localStorage.getItem("completedWords"));
    const gameStorage = localStorage.getItem("game");
    const [word, setWord] = useState([]);
    const [completedWords, setCompletedWords] = useState(completedWordsStorage || []);
    const [wordSecret, setWordSecret] = useState(localStorage.getItem("word"));
    const [chance, setChance] = useState(1);
    const [game, setGame] = useState(STATUS_GAME[0]);

    // CREA NUMERO RANDOM Y LO RETORNA
    const randomNum = (length) => {
        const randomNum = Math.floor(Math.random() * length);
        return randomNum;
    }

    // RETORNA UNA PALABRA
    const randomWord = (array, num) => {
        const randomWord = array[num];
        return randomWord;
    }

    // CREA LOS VALORES PARA LAS ESTADISTICAS
    const getStatistics = () => {
        let played = Number(localStorage.getItem("played"));
        let won = Number(localStorage.getItem("won"));
        let lose = Number(localStorage.getItem("lose"));

        if (!played) {
            played = 0;
            localStorage.setItem("played", played);
        }

        if (!won) {
            won = 0;
            localStorage.setItem("won", won);
        }

        if (!lose) {
            lose = 0;
            localStorage.setItem("lose", lose);
        }
    }

    // VERIFICA ESTADO DEL JUEGO
    const getStatus = () => {
        if (gameStorage === STATUS_GAME[1]) {
            Swal.fire({
                title: 'Ganaste',
                text: '¡Sigue con esa racha, mañana nueva palabra!',
                background: '#121213',
                color: '#FFFFFF',
                confirmButtonText: 'Ok',
                confirmButtonColor: "#818384",
            })
        }

        if (gameStorage === STATUS_GAME[2]) {
            Swal.fire({
                title: 'Perdiste',
                text: '¡vuelve a intentarlo mañana!',
                background: '#121213',
                color: '#FFFFFF',
                confirmButtonText: 'Ok',
                confirmButtonColor: "#818384",
            })
        }
    }

    // SETEA O REINICIA PALABRA SECRETA DEL DIA
    const getWord = () => {
        const num = randomNum(WORDS.length);
        const word = randomWord(WORDS, num);
        const getWord = localStorage.getItem("word");
        const getDay = localStorage.getItem("day");
        const date = new Date();
        const day = date.getDay();

        if (!getWord && !getDay) {
            localStorage.setItem("word", word);
            localStorage.setItem("day", day);
            setWordSecret(localStorage.getItem("word"));
        }

        if (Number(getDay) !== day) {
            localStorage.removeItem("word");
            localStorage.removeItem("day");
            localStorage.removeItem("game");
            localStorage.removeItem("completedWords");
            localStorage.setItem("word", word);
            localStorage.setItem("day", day);
            setWordSecret(localStorage.getItem("word"));
        }
    }

    useEffect(() => {
        getStatistics();
        getStatus();
        getWord();
    }, []);


    return (
        <WordleView
            word={word}
            setWord={setWord}
            completedWords={completedWords}
            setCompletedWords={setCompletedWords}
            wordSecret={wordSecret}
            chance={chance}
            setChance={setChance}
            game={game}
            setGame={setGame}
        />

    )
}

export default Wordle;