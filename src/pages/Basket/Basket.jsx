import React from 'react'
import style from './Basket.module.scss'
import { useNavigate } from 'react-router-dom';

const Basket = ({ addedItems, setAddedItems }) => {
    const navigate = useNavigate()

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
                if (addedItems.includes(choseItem)) {
                    choseItem.quantity -= 1
                    choseItem.totalPrice -= choseItem.price
                    return [choseItem]
                }
                choseItem.quantity -= 1
                choseItem.totalPrice -= choseItem.price
                return [...prev, choseItem]
            })
        } else {
            setAddedItems(addedItems.filter(item => item.id !== product.id));
        }
    };

    const handleDeleteClick = (product) => {
        return product
    }

    return (
        <div className={style.globalContainer}>
            <div className={style.header}>
                <div className={style.backDiv}>
                    <p onClick={() => navigate("/")}>Назад</p>
                </div>
                <div className={style.basketBtn}>
                    <button className={style.button}>1 товаров на 35.85</button>
                </div>
            </div>
            {addedItems.map(item => (
                <div key={item.id} className={style.basketProductsContainer}>
                    <div className={style.productItem}>
                        <div className={style.imgDiv}>
                            <img src="https://m-store.by/wp-content/uploads/2022/12/cranberrygrape-600x600-1.jpg" alt="/" />
                        </div>
                        <div className={style.infoContainer}>
                            <div className={style.info}>
                                <div className={style.titleDiv}>
                                    <p>{item.title}</p>
                                </div>
                                <div className={style.btnsDiv}>
                                    <button className={style.minusProduct} onClick={() => addMore(item)}>
                                        -
                                    </button>
                                    <p className={style.quantity}>{item.quantity}</p>
                                    <button className={style.plusProduct} onClick={() => deleteOne(item)}>
                                        +
                                    </button>
                                </div>
                                <div className={style.priceDiv}>
                                    <div className={style.price}>
                                        <p>{item.totalPrice} €</p>
                                    </div>
                                    <div className={style.delete}>
                                        <p onClick={() => handleDeleteClick(item)}>delete</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Basket