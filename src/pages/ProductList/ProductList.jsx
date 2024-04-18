import React from 'react'
import style from './ProductList.module.scss'
import ProductItem from '../../components/ProductItem/ProductItem'
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom'
import basket from '../../assets/shopping-bag.png'
import { useTranslation } from 'react-i18next';

const ProductList = ({ filteredProducts, addedItems, setAddedItems }) => {
    const navigate = useNavigate()
    const prices = addedItems.reduce((acc, item) => acc += item.totalPrice, 0)
    const {t} = useTranslation()
    const onAdd = (product) => {
        let newItems = [];

        newItems = [...addedItems, product];

        setAddedItems(newItems)
    }
    const isChoseProduct = (product) => addedItems.some((item) => item._id === product._id)

    const addMore = (product) => {
        const item = addedItems.find(item => item._id === product._id);
        let newArr = addedItems.concat()
        if (item.quantity < item.totalQuantity) {
            newArr.splice(newArr.indexOf(item), 1, { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + item.price })
            setAddedItems(newArr)
        } 
    };

    const deleteOne = (product) => {
        const item = addedItems.find(item => item.id === product.id);
        if (item.quantity > 1) {
            let newArr = addedItems.concat()
            newArr.splice(newArr.indexOf(item), 1, { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - item.price })
            setAddedItems(newArr)
        } else {
            setAddedItems(addedItems.filter(item => item._id !== product._id));
        }
    };

    return (
        <div className={style.globalContainer}>
            <h3 className={style.title}>{t("Products")}</h3>
            <div className={style.list}>
                {filteredProducts ? (
                    filteredProducts.map(item => (
                        <ProductItem
                            key={item._id}
                            product={item}
                            className={style.item}
                            count={addedItems.find(item1 => item1._id === item._id)?.quantity}
                            onAdd={onAdd}
                            addedItems={addedItems}
                            isChoseProduct={isChoseProduct}
                            addMore={addMore}
                            deleteOne={deleteOne}
                        />
                    ))
                ) : (
                    <Spin />
                )}
                {
                    filteredProducts.length < 1 && (
                        <div className={style.div}>
                            <p>{t("Product not found.")}</p>
                        </div>
                    )
                }
            </div>
            {addedItems.length > 0 &&
                <div className={style.btnDiv}>
                    <div>
                        <button className={style.button} onClick={() => navigate("/basket")}>
                            <img src={basket} alt='/' />
                            {addedItems.length} {t("items for")} {Math.round(prices)} €
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductList