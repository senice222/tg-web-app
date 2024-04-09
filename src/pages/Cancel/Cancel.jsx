import React from 'react'
import style from './Cancel.module.scss'
import cancel from '../../assets/icons8-крестик-96.png'

const Cancel = () => {
    return (
        <div className={style.container}>
            <div className={style.block}>
                <div>
                    <h1>Что-то пошло не так!</h1>
                    <img src={cancel} alt='/' className={style.img} />
                </div>
                <p>Вам не удалось пополнить баланс.</p>
                <p>Возможно что-то не так с соеденинем.</p>
            </div>
        </div>
    )
}

export default Cancel