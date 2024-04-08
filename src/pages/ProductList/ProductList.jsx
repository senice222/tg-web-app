import React, { useCallback, useEffect, useState } from 'react'
import style from './ProductList.module.scss'
import ProductItem from '../../components/ProductItem/ProductItem'
import Header from '../../components/Header/Header'
import { useTelegram } from '../../hooks/useTelegram'
// import { products } from '../../utils/products'
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom'

const ProductList = ({ addedItems, setAddedItems }) => {
    const { tg, queryId } = useTelegram()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = () => {
            try {
                fetch('http://freetigersclan.su:8000/internal/dataa', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.json();
                    })
                    .then(data => {
                        setProducts(data);
                    })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getProducts();
    }, []);

    // const onSendData = async () => {
    //     const data = {
    //         products: addedItems,
    //         totalPrice: getTotalPrice(addedItems),
    //         queryId
    //     }
    //     await fetch('http://freetigersclan.su:8000/internal/web-data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     })
    // }
    const prices = addedItems.reduce((acc, item) => acc += item.totalPrice, 0)
    
    const onAdd = (product) => {
        let newItems = [];

        newItems = [...addedItems, product];

        setAddedItems(newItems)
    }
    const isChoseProduct = (product) => addedItems.includes(product)

    const addMore = (product) => {
        const item = addedItems.find(item => item.id === product.id);
        setAddedItems((prev) => {
            const choseItem = prev.find(product => product.id === item.id)
            if (addedItems.includes(choseItem)) {
                choseItem.quantity += 1
                choseItem.totalPrice += choseItem.price
                return [choseItem]
            }
            choseItem.quantity += 1
            choseItem.totalPrice += choseItem.price
            return [...prev, choseItem]
        })
    };

    const deleteOne = (product) => {
        const item = addedItems.find(item => item.id === product.id);
        if (item.quantity > 1) {
            setAddedItems((prev) => {
                const choseItem = prev.find(product => product.id === item.id)
                choseItem.quantity -= 1
                choseItem.totalPrice -= choseItem.price
                return [choseItem]
            })
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
                            // onSendData={onSendData}
                        />
                    ))
                ) : (
                    <Spin />
                )}
            </div>
            {addedItems.length > 0 &&
                <button className={style.button} onClick={() => navigate("/basket")}>{addedItems.length} товаров на {prices} </button>
            }
        </div>
    )
}

export default ProductList