import React from 'react'
import style from './ProductItem.module.scss'
// onSendData
const ProductItem = ({ product, className, onAdd, isChoseProduct }) => {

    const send = (product) => {
        onAdd(product)
        // onSendData()
    }
    const isChose = isChoseProduct(product)
    console.log(isChoseProduct)
    return (
        <div className={`${style.product} ${className}`}>
            <div className={style.img} />
            <div className={style.title}>{product.title}</div>
            <div className={style.price}>
                <b>{product.price} €</b>
            </div>
            <div className={style.description}>
                {
                    product.description.map(item => <div><span><b><i>{item.label}</i></b> {item.value}</span></div>)
                }
            </div>

            {!isChose ? (
                <button className={style.addBasketBtn} onClick={() => send(product)}>
                    В корзину
                </button>
            ) : (
                <div className={style.wrapper}>
                    <button className={style.minusProduct}>
                        -
                    </button>
                    <h3 className={style.quantity}>1</h3>
                    <button className={style.plusProduct}>
                        +
                    </button>
                </div>
            )}
            <button className={style.buy}>
                Купить сразу
            </button>
        </div>
    );
}

export default ProductItem