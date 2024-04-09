import React from 'react'
import style from './Success.module.scss'
import success from '../../assets/kindpng_4312134.png'

const Success = () => {
    return (
        <div className={style.container}>
            <div className={style.block}>
                <div>
                    <h1>Оплата прошла успешно!</h1>
                    <img src={success} alt='/' className={style.img} />
                </div>
                <p>Вы успешно пополнили ваш баланс.</p>
                <p>Можете возвращаться в бота.</p>
            </div>
        </div>
    )
}

export default Success