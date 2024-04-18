import React from 'react'
import style from './SucceedPayment.module.scss'
import success from '../../assets/kindpng_4312134.png'
import { useTranslation } from 'react-i18next'

const SucceedPayment = () => {
    const {t} = useTranslation()

    return (
        <div className={style.container}>
            <div className={style.block}>
                <div>
                    <h1>{t("success")}</h1>
                    <img src={success} alt='/' className={style.img} />
                </div>
                <p>{t("openTg")}</p>
            </div>
        </div>
    )
}

export default SucceedPayment