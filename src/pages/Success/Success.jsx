import React from 'react'
import style from './Success.module.scss'
import success from '../../assets/kindpng_4312134.png'
import { useTranslation } from 'react-i18next'

const Success = () => {
    const {t} = useTranslation

    return (
        <div className={style.container}>
            <div className={style.block}>
                <div>
                    <h1>{t("You have successfully topped up your balance.")}</h1>
                    <img src={success} alt='/' className={style.img} />
                </div>
                <p>{t("You can return to the bot now.")}</p>
            </div>
        </div>
    )
}

export default Success