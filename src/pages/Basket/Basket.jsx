import React from 'react'
import style from './Basket.module.scss'

const Basket = () => {
    return (
        <div className={style.globalContainer}>
            <div className={style.header}>
                <div className={style.backDiv}>
                    <p>Назад</p>
                </div>
                <div className={style.basketBtn}>
                    <button className={style.button}>1 товаров на 35.85</button>
                </div>
            </div>
            <div className={style.basketProductsContainer}>
                <div className={style.productItem}>
                    <div className={style.imgDiv}>
                        <img src="" alt="/" />
                    </div>
                </div>
                <div className={style.infoContainer}>
                    <div className={style.info}>
                        <div className={style.titleDiv}>
                            <p>Mango Peach</p>
                        </div>
                        <div className={style.btnsDiv}>
                            <button className={style.minusProduct} onClick={() => deleteOne(product)}>
                                -
                            </button>
                            <p className={style.quantity}>{product.quantity}</p>
                            <button className={style.plusProduct} onClick={() => addMore(product)}>
                                +
                            </button>
                        </div>
                        <div className={style.priceDiv}>
                            <div className={style.price}>
                                <p>35 euro</p>
                            </div>
                            <div className={style.delete}>
                                <p>delete</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Basket