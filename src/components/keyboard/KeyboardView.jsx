import React from 'react';
import "./KeyboardView.scss";
import { ARRAY_KEYBOARD } from "../../utils/constants";
import "../../assets/styles/base.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KeyboardView = ({
    handleClick
}) => {

    return (
        <div className="keyboard">
            {
                ARRAY_KEYBOARD && ARRAY_KEYBOARD.map((row, i) => (
                    <div key={i} className="keyboard__row">
                        {
                            row && row.map((letter, f) => (
                                <button onClick={handleClick} key={f} className="keyboard__key">
                                    {letter}
                                </button>
                            ))
                        }
                    </div>
                ))
            }
            <ToastContainer />
        </div>
    )
}

export default KeyboardView;