import React, { useEffect, useState } from 'react'
import style from './Basket.module.scss'
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import cross from '../../assets/icons8-крестик-96.png'
import basket from '../../assets/free-icon-shopping-bag-2956820.png'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Basket = ({ addedItems, setAddedItems }) => {
    const navigate = useNavigate()
    const { id } = useTelegram()
    const {t} = useTranslation()
    const [currentUser, setCurrentUser] = useState()
    const [error, setError] = useState("")

    useEffect(() => {
        try {
            fetch(`https://skateboardjumpers.agency/internal/getUser/${id}`, {
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
        if (item.quantity < item.totalQuantity) {
            newArr.splice(newArr.indexOf(item), 1, { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + item.price })
            setAddedItems(newArr)
        } 
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
    const createPayment = async () => {
        if (currentUser.balance >= totalPrice) {
            try {
                await axios.post(`https://skateboardjumpers.agency/internal/changeBalance/${id}`, {
                    price: +totalPrice,
                    items: addedItems
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                window.location.replace("https://skateboardjumpers.agency/succeedPayment");
            } catch (error) {
                console.error(error);
            }
        } else {
            setError(t("Insufficient funds. Please top up your balance."))
        }
    }

    return (
        <div className={style.globalContainer}>
            <div className={style.header}>
                <div className={style.backDiv}>
                    <p onClick={() => navigate("/")}>{t("Back")}</p>
                </div>
                <div className={style.basketBtn}>
                    <button className={style.button}>{addedItems.length} {t("items for")} {totalPrice} €</button>
                </div>
            </div>
            {addedItems.map(item => (
                <div key={item._id} className={style.basketProductsContainer}>
                    <div className={style.productItem}>
                        <div className={style.imgDiv}>
                            <img src={item.photo} alt="/" />
                        </div>
                        <div className={style.infoContainer}>
                            <div className={style.info}>
                                <div className={style.titleDiv}>
                                    <p>{item.tastes}</p>
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
                                    <div className={style.delete} onClick={() => handleDeleteClick(item)}>
                                        <img src={cross} style={{ width: "30px", height: "30px", cursor: "pointer" }} alt='/' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {
                addedItems.length < 1 && (
                    <div className={style.wrapp}>
                        <div className={style.productBasketContainer}>
                            <div className={style.clearBasket}>
                                <img src={basket} alt='/'/>
                                <p>{t("Your basket is empty")}</p>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className={style.footerContainer}>
                <div className={style.flexDiv}>
                    <div className={style.summa}>{t("Total")}</div>
                    <div className={style.totalPrice}>{totalPrice} €</div>
                </div>
                <div>
                    <p style={{ color: "red", fontSize: "13px" }}>{error}</p>
                </div>
                <button className={style.btn} onClick={createPayment}>{t("Place Order")}</button>
            </div>
        </div>
    )
}

export default Basket