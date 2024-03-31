import React, { useCallback, useEffect, useState } from 'react'
import style from './ProductList.module.scss'
import ProductItem from '../ProductItem/ProductItem'
import Header from '../Header/Header'
import {useTelegram} from '../../hooks/useTelegram'

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

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
    const {tg, queryId} = useTelegram()
    const [addedItems, setAddedItems] = useState([])

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId
        }
        fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [basket])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }
    return (
        <div className={style.globalContainer}>
            <Header />
            <h3 className={style.title}>WoToFo 3000</h3>
            <div className={style.list}>
                {products.map(item => (
                    <ProductItem
                        product={item}
                        className={style.item}
                        onAdd={onAdd}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductList