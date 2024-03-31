import React, { useEffect, useState } from 'react'
import style from './ProductItem.module.scss'
import { useTelegram } from '../../hooks/useTelegram'

const ProductItem = ({ product, className }) => {
    const [basket, setBasket] = useState([])
    const {tg} = useTelegram()
    const countAllPrice = basket.reduce((acc, item) => acc += item.price, 0)
    console.log(countAllPrice)
    const setProductInState = () => setBasket((prev) => [...prev, product])

    useEffect(() => {
        if (basket.length > 0) {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `${basket.length} на ${countAllPrice} €`
            });
        } else {
            tg.MainButton.hide();
        }
    }, [basket]);


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

            <button className={style.addBasketBtn} onClick={setProductInState}>
                В корзину
            </button>
            <button className={style.buy}>
                Купить сразу
            </button>
        </div>
    );
}

export default ProductItem