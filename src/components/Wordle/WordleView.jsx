import "./WordleView.scss";
import RowCompleted from '../RowCompleted/RowCompleted';
import RowCurrent from '../RowCurrent/RowCurrent';
import Keyboard from '../keyboard/Keyboard';
import Header from '../Header/Header';
import { STATUS_GAME } from '../../utils/constants';

const WordleView = ({
    word,
    setWord,
    completedWords,
    setCompletedWords,
    wordSecret,
    chance,
    setChance,
    game,
    setGame
}) => {

    return (
        <div className='wordle'>
            <div className="wordle__header-section">
                <Header />
            </div>
            <div className="wordle__word-section">
                {
                    completedWords && completedWords.map((word, i) => (
                        <RowCompleted
                            key={i}
                            word={word}
                            wordSecret={wordSecret}
                        />
                    ))
                }
                {
                    game && game === STATUS_GAME[0] && (
                        <RowCurrent
                            word={word}
                        />
                    )
                }
            </div>
            <div className="wordle__keyboard-section">
                <Keyboard
                    chance={chance}
                    setChance={setChance}
                    completedWords={completedWords}
                    setCompletedWords={setCompletedWords}
                    game={game}
                    setGame={setGame}
                    word={word}
                    setWord={setWord}
                    wordSecret={wordSecret}
                />
            </div>
        </div>
    )
}

export default WordleView;