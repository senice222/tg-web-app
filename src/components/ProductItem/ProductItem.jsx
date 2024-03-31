import React from 'react'
import style from './ProductItem.module.scss'
import Button from "../Button/Button";

const ProductItem = ({product, className}) => {
    return (
        <div className={`${style.product} ${style.className}`}>
            <div className={style.img}/>
            <div className={style.title}>{product.title}</div>
            <div className={style.description}>{product.description}</div>
            <div className={style.price}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={style.addBtn}>
                Добавить в корзину
            </Button>
        </div>
    );
}

export default ProductItem