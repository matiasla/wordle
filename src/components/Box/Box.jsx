import React from 'react';
import "./Box.scss";

const Box = ({
    value,
    status
}) => {
    return (
        <div className={status}>
            {value}
        </div>
    )
}

export default Box;