import React from 'react'
import style from './ProductItem.module.scss'
import Button from "../Button/Button";

const ProductItem = ({ product, className }) => {
    return (
        <div className={`${style.product} ${className}`}>
            <div className={style.img} />
            <div className={style.title}>{product.title}</div>
            <div className={style.price}>
                <b>Стоимость: {product.price} €</b>
            </div>
            <div className={style.description}>
                {
                    product.description.map(item => <div><span><b><i>{item.label}</i></b> {item.value}</span></div>)
                }
            </div>

            <Button className={style.addBtn}>
                Добавить в корзину
            </Button>
        </div>
    );
}

export default ProductItem