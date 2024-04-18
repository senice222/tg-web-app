import React from 'react'
import style from './Cancel.module.scss'
import cancel from '../../assets/icons8-крестик-96.png'
import { useTranslation } from 'react-i18next';

const Cancel = () => {
    const {t} = useTranslation()

    return (
        <div className={style.container}>
            <div className={style.block}>
                <div>
                    <h1>{t("somethingWentWrong")}</h1>
                    <img src={cancel} alt='/' className={style.img} />
                </div>
                <p>{t("notSuccess")}</p>
                <p>{t("connection")}</p>
            </div>
        </div>
    )
}

export default Cancel