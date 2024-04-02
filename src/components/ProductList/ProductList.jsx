import React, { useCallback, useEffect, useState } from 'react'
import style from './ProductList.module.scss'
import ProductItem from '../ProductItem/ProductItem'
import Header from '../Header/Header'
import { useTelegram } from '../../hooks/useTelegram'
import {products} from '../../utils/products'
import { Spin } from 'antd';

const ProductList = () => {
    const { tg, queryId } = useTelegram()
    const [addedItems, setAddedItems] = useState([])

    // const [products, setProducts] = useState([])

    // useEffect(() => {
    //     const getProducts = () => {
    //         try {
    //             fetch('http://89.208.103.148:8000/internal/get-products', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 }
    //             })
    //                 .then(res => {
    //                     if (!res.ok) {
    //                         throw new Error('Network response was not ok');
    //                     }
    //                     return res.json();
    //                 })
    //                 .then(data => {
    //                     setProducts(data);
    //                 })
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     getProducts();
    // }, []);

    // const onSendData = async () => {
    //     const data = {
    //         products: addedItems,
    //         totalPrice: getTotalPrice(addedItems),
    //         queryId
    //     }
    //     await fetch('http://89.208.103.148:8000/internal/web-data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     })
    // }

    const onAdd = (product) => {
        let newItems = [];

        newItems = [...addedItems, product];

        setAddedItems(newItems)

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                // ${getTotalPrice(newItems)}
                text: `Купить`
            })
        }
    }
    const isChoseProduct = (product) => addedItems.includes(product)
    
    const updateTotalPrice = () => addedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const addMore = (product) => {
        const item = addedItems.find(item => item.id === product.id);
        setAddedItems(prevItems => {
            const index = prevItems.findIndex(item => item.id === product.id);
            if (index !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[index] = {
                    ...updatedItems[index],
                    quantity: updatedItems[index].quantity + 1
                };
                return updatedItems;
            }
            return prevItems;
        });
        item.quantity += 1;
        updateTotalPrice();
    };
    
    const deleteOne = (product) => {
        const item = addedItems.find(item => item.id === product.id);
        if (item.quantity > 0) {
            setAddedItems(prevItems => {
                const index = prevItems.findIndex(item => item.id === product.id);
                if (index !== -1 && prevItems[index].quantity > 0) {
                    const updatedItems = [...prevItems];
                    updatedItems[index] = {
                        ...updatedItems[index],
                        quantity: updatedItems[index].quantity - 1
                    };
                    return updatedItems;
                }
                return prevItems;
            });
            item.quantity -= 1;
            updateTotalPrice();
        } else {
            setAddedItems(addedItems.filter(item => item.id !== product.id));
        }
    };
    

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
                            addedItems={addedItems}
                            isChoseProduct={isChoseProduct}
                            addMore={addMore}
                            deleteOne={deleteOne}
                            updateTotalPrice={updateTotalPrice}
                            // onSendData={onSendData}
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