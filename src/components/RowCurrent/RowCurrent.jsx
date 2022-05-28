import React from 'react';
import "./RowCurrent.scss";
import Box from '../Box/Box';

const RowCurrent = ({
    word
}) => {

    const status = "current";

    return (
        <div className="row-current">
            {
                word.length > 0 && word.map((letter, i) => (
                    <Box
                        key={i}
                        value={letter}
                        status={status}
                    />
                ))
            }
        </div>
    )
}

export default RowCurrent;