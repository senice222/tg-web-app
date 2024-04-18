import React from 'react'
import style from './ProductItem.module.scss'
import { useTranslation } from 'react-i18next'

const ProductItem = ({ product, className, onAdd, isChoseProduct, addMore, deleteOne, count, limit }) => {
    const {t} = useTranslation
    const isChose = isChoseProduct(product)

    return (
        <div className={`${style.product} ${className}`}>
            <img className={style.img} src={product.photo} alt='/' />
            <div className={style.title}>{product.tastes}</div>
            <div className={style.price}>
                <b>{product.totalPrice} €</b>
            </div>
            <div className={style.description}>
                {
                    product ?
                        product.productDetailes.map(item =>
                            <div key={item.label}>
                                <span><b><i>{item.label}</i></b> {item.value}</span>
                            </div>
                        )
                        :
                        <p>loading</p>
                }
            </div>

            {!isChose ? (
                <button className={style.addBasketBtn} onClick={() => onAdd(product)}>
                    {t("addToCart")}
                </button>
            ) : (
                <div className={style.wrapper}>
                    <button className={style.minusProduct} onClick={() => deleteOne(product)}>
                        -
                    </button>
                    <p className={style.quantity}>{count}</p>
                    <button className={style.plusProduct} onClick={() => addMore(product)}>
                        +
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductItem