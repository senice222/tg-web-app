import React, { useCallback, useEffect, useState } from 'react'
import style from './ProductList.module.scss'
import ProductItem from '../ProductItem/ProductItem'
import Header from '../Header/Header'
import { useTelegram } from '../../hooks/useTelegram'
// import {products} from '../../utils/products'
import { Spin } from 'antd';

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const { tg, queryId } = useTelegram()
    const [addedItems, setAddedItems] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('http://89.208.103.148:8000/internal/get-products', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
        
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getProducts();
    }, []);

    const onSendData = async () => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId
        }
        await axios.post('http://89.208.103.148:8000/internal/get-products', data);
    }

    // const onSendData = useCallback(() => {
    //     const data = {
    //         products: addedItems,
    //         totalPrice: getTotalPrice(addedItems),
    //         queryId
    //     }
    //     fetch('http://89.208.103.148:8000/web-data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     })
    // }, [addedItems])

    // useEffect(() => {
    //     tg.onEvent('mainButtonClicked', onSendData)
    //     return () => {
    //         tg.offEvent('mainButtonClicked', onSendData)
    //     }
    // }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if (newItems.length === 0) {
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
                {products !== undefined ? (
                    products.map(item => (
                        <ProductItem
                            key={item.id}
                            product={item}
                            className={style.item}
                            onAdd={onAdd}
                            onSendData={onSendData}
                        />
                    ))
                ) : (
                    <Spin />
                )}
            </div>
        </div>
    )
}

export default ProductList