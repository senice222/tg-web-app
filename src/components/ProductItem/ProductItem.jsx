import React from 'react'
import style from './ProductItem.module.scss'

const ProductItem = ({ product, className, onAdd, onSendData }) => {

    const send = (product) => {
        onAdd(product)
        onSendData()
    }

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

            <button className={style.addBasketBtn} onClick={() => send(product)}>
                В корзину
            </button>
            <button className={style.buy}>
                Купить сразу
            </button>
        </div>
    );
}

export default ProductItem