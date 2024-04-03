import React from 'react'
import style from './Basket.module.scss'

const Basket = ({addedItems, setAddedItems}) => {


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
                        <img src="https://m-store.by/wp-content/uploads/2022/12/cranberrygrape-600x600-1.jpg" alt="/" />
                    </div>
                </div>
                <div className={style.infoContainer}>
                    <div className={style.info}>
                        <div className={style.titleDiv}>
                            <p>Mango Peach</p>
                        </div>
                        <div className={style.btnsDiv}>
                            <button className={style.minusProduct}>
                                -
                            </button>
                            <p className={style.quantity}>1</p>
                            <button className={style.plusProduct} >
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