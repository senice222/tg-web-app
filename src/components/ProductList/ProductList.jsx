import React from 'react'
import style from './ProductList.module.scss'
import ProductItem from '../ProductItem/ProductItem'
import Header from '../Header/Header'

const ProductList = () => {
    const products = [
        { id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые' },
        { id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая' },
        { id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые' },
        { id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая' },
        { id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые' },
        { id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая' },
        { id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые' },
        { id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая' },
    ]

    return (
        <>
            <Header />
            <h3 className={style.title}>WoToFo 3000</h3>
            <div className={style.list}>
                {products.map(item => (
                    <ProductItem
                        product={item}
                        className={style.item}
                    />
                ))}
            </div>
        </>
    )
}

export default ProductList