import React from 'react'
import style from './SucceedPayment.module.scss'
import success from '../../assets/kindpng_4312134.png'

const SucceedPayment = () => {
    return (
        <div className={style.container}>
            <div className={style.block}>
                <div>
                    <h1>Вы успешно приобрели товар!</h1>
                    <img src={success} alt='/' className={style.img} />
                </div>
                <p>Откройте профиль в телеграм боте.</p>
            </div>
        </div>
    )
}

export default SucceedPayment