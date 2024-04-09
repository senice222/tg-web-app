import React from 'react'
import style from './Basket.module.scss'
import { useNavigate } from 'react-router-dom';

const Basket = ({ addedItems, setAddedItems }) => {
    const navigate = useNavigate()

    const addMore = (product) => {
        const item = addedItems.find(item => item._id === product._id);
        let newArr = addedItems.concat()
        newArr.splice(newArr.indexOf(item), 1, { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + item.price })
        setAddedItems(newArr)
    };

    const deleteOne = (product) => {
        const item = addedItems.find(item => item._id === product._id);
        if (item.quantity > 1) {
            let newArr = addedItems.concat()
            newArr.splice(newArr.indexOf(item), 1, { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - item.price })
            setAddedItems(newArr)
        } else {
            setAddedItems(addedItems.filter(item => item._id !== product._id));
        }
    };
    
    const handleDeleteClick = (product) => {
        const updatedItems = addedItems.filter(item => item._id !== product._id);
        setAddedItems(updatedItems);
    }
    const totalPrice = Math.round(addedItems.reduce((acc, curr) => acc += curr.totalPrice, 0))

    return (
        <div className={style.globalContainer}>
            <div className={style.header}>
                <div className={style.backDiv}>
                    <p onClick={() => navigate("/")}>Назад</p>
                </div>
                <div className={style.basketBtn}>
                    <button className={style.button}>{addedItems.length} товаров на {totalPrice} €</button>
                </div>
            </div>
            {addedItems.map(item => (
                <div key={item._id} className={style.basketProductsContainer}>
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
                                    <button className={style.minusProduct} onClick={() => deleteOne(item)}>
                                        -
                                    </button>
                                    <p className={style.quantity}>{item.quantity}</p>
                                    <button className={style.plusProduct} onClick={() => addMore(item)}>
                                        +
                                    </button>
                                </div>
                                <div className={style.priceDiv}>
                                    <div className={style.price}>
                                        <h3>{Math.round(item.totalPrice)} €</h3>
                                        <div><p>{Math.round(item.price)} €</p></div>
                                    </div>
                                    <div className={style.delete}>
                                        <button onClick={() => handleDeleteClick(item)}>delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className={style.footerContainer}>
                <div className={style.flexDiv}>
                    <div className={style.summa}>Сумма</div>
                    <div className={style.totalPrice}>{totalPrice} €</div>
                </div>
                <button className={style.btn} onClick={() => navigate("/typeOfPayment")}>Оформить заказ</button>
            </div>
        </div>
    )
}

export default Basket