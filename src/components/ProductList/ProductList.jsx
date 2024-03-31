import React, { useCallback, useEffect, useState } from 'react'
import style from './ProductList.module.scss'
import ProductItem from '../ProductItem/ProductItem'
import Header from '../Header/Header'
import {useTelegram} from '../../hooks/useTelegram'
import {products} from '../../utils/products'

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const {tg, queryId} = useTelegram()
    const [addedItems, setAddedItems] = useState([])


    // const onSendData = async () => {
    //     const data = {
    //         products: addedItems,
    //         totalPrice: getTotalPrice(addedItems),
    //         queryId
    //     }
    //     await fetch('http://localhost:8000/web-data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     })
    // }

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
    }, [addedItems])

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
                        // onSendData={onSendData}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductList