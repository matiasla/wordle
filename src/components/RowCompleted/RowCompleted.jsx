import React from 'react';
import "./RowCompleted.scss";
import Box from '../Box/Box';

const RowCompleted = ({
    word,
    wordSecret
}) => {

    // VERIFICA QUE LETRA ESTA INCLUIDA EN LA PALABRA SECRETA
    const verifyLetter = (letter, position) => {
        if (wordSecret.includes(letter)) {
            if (wordSecret[position] === letter) {
                return "correct";
            } else {
                return "included";
            }

        } else {
            return "no-this";
        }
    }

    return (
        <div className="row-completed">
            {
                word && word.map((letter, i) => (
                    <Box
                        key={i}
                        value={letter}
                        status={verifyLetter(letter, i)}
                    />
                ))
            }
        </div>
    )

}

export default RowCompleted;