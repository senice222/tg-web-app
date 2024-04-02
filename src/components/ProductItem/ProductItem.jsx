import React from 'react'
import style from './ProductItem.module.scss'
// onSendData
const ProductItem = ({ product, addedItems, className, onAdd, isChoseProduct }) => {

    const send = (product) => {
        onAdd(product)
        // onSendData()
    }
    const isChose = isChoseProduct(product)

    const addMore = () => {
        const item = addedItems.find(item => item.id === product.id)
        item.quantity += 1
        const price = item.price
        item.price += price
    }

    const deleteOne = () => {
        const item = addedItems.find(item => item.id === product.id)
        if (item.quantity < 1) {
            return addedItems.filter(item => item.id !== product.id)
        } else {
            item.quantity -= 1
            item.price -= price
        }
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

            {!isChose ? (
                <button className={style.addBasketBtn} onClick={() => send(product)}>
                    В корзину
                </button>
            ) : (
                <div className={style.wrapper}>
                    <button className={style.minusProduct} onClick={deleteOne}>
                        -
                    </button>
                    <p className={style.quantity}>1</p>
                    <button className={style.plusProduct} onClick={addMore}>
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