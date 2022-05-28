import React from 'react';
import "./KeyboardView";
import { STATUS_GAME, WORDS } from "../../utils/constants";
import Swal from 'sweetalert2';
import "../../assets/styles/base.scss";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KeyboardView from './KeyboardView';

const Keyboard = ({
    word,
    setWord,
    wordSecret,
    game,
    setGame,
    setCompletedWords,
    completedWords,
    chance,
    setChance
}) => {

    // SETEA VALORES EN STORAGE SI EL USUARIO GANA
    const setWinStorage = () => {
        let played = Number(localStorage.getItem("played"));
        let won = Number(localStorage.getItem("won"));
        let lose = Number(localStorage.getItem("lose"));

        if (played) {
            played = played + 1;
            localStorage.removeItem("played");
            localStorage.setItem("played", played);
        } else {
            played = 1;
            localStorage.setItem("played", played);
        }

        if (won) {
            won = won + 1;
            localStorage.removeItem("won");
            localStorage.setItem("won", won);
        } else {
            won = 1;
            localStorage.setItem("won", won);
        }

        if (!lose) {
            lose = 0;
            localStorage.setItem("lose", lose);
        }
    }

    // SETEA VALORES EN STORAGE SI EL USUARIO PIERDE
    const setLoseStorage = () => {
        let played = Number(localStorage.getItem("played"));
        let lose = Number(localStorage.getItem("lose"));
        let won = Number(localStorage.getItem("won"));

        if (played) {
            played = played + 1;
            localStorage.removeItem("played");
            localStorage.setItem("played", played);
        } else {
            played = 1;
            localStorage.setItem("played", played);
        }

        if (lose) {
            lose = lose + 1;
            localStorage.removeItem("lose");
            localStorage.setItem("lose", lose);
        } else {
            lose = 1;
            localStorage.setItem("lose", lose);
        }

        if (!won) {
            won = 0;
            localStorage.setItem("won", won);
        }
    }

    // SETEA ESTADO DEL JUEGO SI EL USUARIO GANA
    const setStatusStorageWin = () => {
        localStorage.removeItem("game");
        localStorage.removeItem("completedWords");
        localStorage.setItem("game", STATUS_GAME[1]);
        localStorage.setItem("completedWords", JSON.stringify([...completedWords, word]));
    }

    // SETEA ESTADO DEL JUEGO SI EL USUARIO PIERDE
    const setStatusStorageLose = () => {
        localStorage.removeItem("game");
        localStorage.removeItem("completedWords");
        localStorage.setItem("game", STATUS_GAME[2]);
        localStorage.setItem("completedWords", JSON.stringify([...completedWords, word]));
    }

    // ALERTA SI EL USUARIO GANA LA PARTIDA
    const alertWin = () => {
        Swal.fire({
            title: 'Ganaste',
            text: '¡Sigue con esa racha, mañana nueva palabra!',
            background: '#121213',
            color: '#FFFFFF',
            confirmButtonText: 'Ok',
            confirmButtonColor: "#818384",
        })
    }

    // ALERTA SI EL USUARIO PIERDE LA PARTIDA
    const alertLose = () => {
        Swal.fire({
            title: 'Perdiste',
            text: '¡vuelve a intentarlo mañana!',
            background: '#121213',
            color: '#FFFFFF',
            confirmButtonText: 'Ok',
            confirmButtonColor: "#818384",
        })
    }

    // CONTROLA CADA CLICK DEL TECLADO
    const handleClick = (e) => {

        const letter = e.target.innerHTML;
        const auxWord = word;

        // RETORNA SI EL ESTADO ES TERMINO SU PARTIDA DIARIA
        if (game !== STATUS_GAME[0]) {
            return 0;
        }

        // SI SE PRESIONA "BORRAR"
        if (letter.toUpperCase() === "BORRAR") {
            auxWord.pop();
            setWord([...auxWord])
            return 0;
        }

        // SI SE PRESIONA "ENTER"
        if (letter.toUpperCase() === "ENTER") {

            // SI EL USUARIO ADIVINA LA PALABRA
            if (word.join("") === wordSecret) {
                setCompletedWords([...completedWords, word]);
                setGame(STATUS_GAME[1]);
                setWinStorage();
                setStatusStorageWin();
                alertWin();
                return 0;
            }

            // SI EL USUARIO PIERDE LA PARTIDA
            if (chance === wordSecret.length + 1) {
                setLoseStorage();
                setCompletedWords([...completedWords, word]);
                setGame(STATUS_GAME[2]);
                setStatusStorageLose();
                alertLose();
                return 0;
            }

            // SE VERIFICA LONGITUD DE LA PALABRA Y SE DA UNA PISTA
            if (word.length < wordSecret.length) {
                toast.info("¡La palabra tiene mas letras!")
            }

            if (word.length > wordSecret.length) {
                toast.info("¡La palabra tiene menos letras!")
            }

            // ADVERTENCIA DE PALABRA NO INCLUIDA
            if (word.length === wordSecret.length && !WORDS.includes(word)) {
                toast.warn("¡La palabra no esta incluida!")
                return 0;
            }

            // MODIFICACION DE VALORES INICIALES
            setCompletedWords([...completedWords, word]);
            setChance(chance + 1);
            setWord([]);
        }

        // ACTUALIZA PALABRA
        if (letter.toUpperCase() !== "ENTER") {
            setWord([...word, letter]);
        }

    }

    return (
        <KeyboardView
            handleClick={handleClick}
            word={setWord}
            wordSecret={wordSecret}
            game={setGame}
            completedWords={completedWords}
            setCompletedWords={setCompletedWords}
            chance={chance}
            setChance={setChance}
        />
    )
}

export default Keyboard;