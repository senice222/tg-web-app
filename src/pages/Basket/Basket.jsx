import React, { useEffect, useState } from 'react'
import style from './Basket.module.scss'
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';

const Basket = ({ addedItems, setAddedItems }) => {
    const navigate = useNavigate()
    const { id } = useTelegram()
    const [currentUser, setCurrentUser] = useState()
    const [error, setError] = useState("")

    console.log(id)

    useEffect(() => {
        try {
            fetch(`https://vape-shop8.shop/internal/getUser/${id}`, {
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
                    setCurrentUser(data);
                })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [])

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

    const createPayment = () => {
        if (currentUser.balance >= totalPrice) {
            try {
                fetch(`https://vape-shop8.shop/internal/changeBalance/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ price: +totalPrice })
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.json();
                    })
                window.location.replace("https://vape-shop8.shop/succeedPayment");
            } catch (e) {
                console.log(e)
            }
        } else {
            setError("У вас недостаточно средств. Пополните баланс.")
        }
    }

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
                <div>
                    <p style={{ color: "red" }}>{error}</p>
                </div>
                <button className={style.btn} onClick={createPayment}>Оформить заказ</button>
            </div>
        </div>
    )
}

export default Basket