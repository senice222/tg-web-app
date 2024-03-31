import React from 'react'
import style from './ProductList.module.scss'
import ProductItem from '../ProductItem/ProductItem'
import Header from '../Header/Header'

const ProductList = () => {
    const products = [
        {
            id: '1', title: 'Джинсы', price: 5000, description: [
                { label: "Название: ", value: "Vaprolax 3000" }, { label: "Вкус: ", value: "Манго Персик Ананас" }, {label: "Объем: ", value: "3000 тяжек"}
            ]
        },
        {
            id: '2', title: 'Куртка', price: 12000, description: [
                { label: "Название: ", value: "Vaprolax 3000" }, { label: "Вкус: ", value: "Манго Персик Ананас" }, {label: "Объем: ", value: "3000 тяжек"}
            ]
        },
        {
            id: '3', title: 'Джинсы 2', price: 5000, description: [
                { label: "Название: ", value: "Vaprolax 3000" }, { label: "Вкус: ", value: "Манго Персик Ананас" }, {label: "Объем: ", value: "3000 тяжек"}
            ]
        },
        {
            id: '4', title: 'Куртка 8', price: 122, description: [
                { label: "Название: ", value: "Vaprolax 3000" }, { label: "Вкус: ", value: "Манго Персик Ананас" }, {label: "Объем: ", value: "3000 тяжек"}
            ]
        },
        {
            id: '5', title: 'Джинсы 3', price: 5000, description: [
                { label: "Название: ", value: "Vaprolax 3000" }, { label: "Вкус: ", value: "Манго Персик Ананас" }, {label: "Объем: ", value: "3000 тяжек"}
            ]
        },
        {
            id: '6', title: 'Куртка 7', price: 600, description: [
                { label: "Название: ", value: "Vaprolax 3000" }, { label: "Вкус: ", value: "Манго Персик Ананас" }, {label: "Объем: ", value: "3000 тяжек"}]
        },
        {
            id: '7', title: 'Джинсы 4', price: 5500, description: [
                { label: "Название: ", value: "Vaprolax 3000" }, { label: "Вкус: ", value: "Манго Персик Ананас" }, {label: "Объем: ", value: "3000 тяжек"}
            ]
        },
        {
            id: '8', title: 'Куртка 5', price: 12000, description: [
                { label: "Название: ", value: "Vaprolax 3000" }, { label: "Вкус: ", value: "Манго Персик Ананас" }, {label: "Объем: ", value: "3000 тяжек"}
            ]
        },
    ]

    return (
        <div className={style.globalContainer}>
            <Header />
            <div className={style.list}>
                <h3 className={style.title}>WoToFo 3000</h3>
                {products.map(item => (
                    <ProductItem
                        product={item}
                        className={style.item}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductList