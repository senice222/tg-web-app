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
                    <h1>{t("Something went wrong!")}</h1>
                    <img src={cancel} alt='/' className={style.img} />
                </div>
                <p>{t("You were not able to top up your balance.")}</p>
                <p>{t("There might be an issue with the connection.")}</p>
            </div>
        </div>
    )
}

export default Cancel