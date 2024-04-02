import React from 'react'
import style from './ProductItem.module.scss'
// onSendData
const ProductItem = ({ product, className, onAdd, isChoseProduct, addMore, deleteOne, updateTotalPrice }) => {

    const send = (product) => {
        onAdd(product)
        // onSendData()
    }
    const isChose = isChoseProduct(product)
    const updatedPrice = updateTotalPrice()

    return (
        <div className={`${style.product} ${className}`}>
            <div className={style.img} />
            <div className={style.title}>{product.title}</div>
            <div className={style.price}>
                <b>{product.quantity < 1 ? updatedPrice : product.price} €</b>
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
                    <button className={style.minusProduct} onClick={() => deleteOne(product)}>
                        -
                    </button>
                    <p className={style.quantity}>{product.quantity}</p>
                    <button className={style.plusProduct} onClick={() => addMore(product)}>
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