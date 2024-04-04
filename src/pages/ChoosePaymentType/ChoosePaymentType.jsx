import React from 'react'
import style from './ChoosePaymentType.module.scss'

const ChoosePaymentType = () => {

    return (
        <div className={style.typesContainer}>
            <div className={style.btns}>
                <button>
                    Stripe
                </button>
                <button>
                    CryptoBot
                </button>
            </div>
        </div>
    )
}

export default ChoosePaymentType