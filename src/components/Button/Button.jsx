import React from 'react'
import style from './Button.module.scss'

const Button = (props) => {
    return (
        <button {...props} className={`${style.button} ${props.className}`}/>
    );
};

export default Button