import React, { useState, useEffect } from 'react'
import style from './Header.module.scss'
import filter from '../../assets/filter.png'
import { useDebounce } from '../../hooks/useDebounce'
import { useNavigate } from "react-router-dom";
import { products } from '../../utils/products';

const Header = () => {
    const [value, setValue] = useState("")
    const [productsList, setProductsList] = useState()
    const navigate = useNavigate()
    const debouncedValue = useDebounce(value, 300)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const getProducts = () => {
            const data = products.filter(item => item.title.toLowerCase().includes(debouncedValue.toLowerCase()))
            setProductsList(data)
        }
        getProducts()
    }, [debouncedValue])

    const itemClickHandler = (e) => {
        const clickedProduct = e.target.textContent
        setValue(clickedProduct)
        const choseUser = productsList.filter(item => item.title === clickedProduct)
        console.log(choseUser)
        const productUrl = `/profile`
        if (clickedProduct) {
            navigate(productUrl, { replace: true })
        }
        setIsOpen(false)
    }

    return (
        <div className={style.header}>
            <div className={style.filtersDiv}>
                <div className={style.container}>
                    <img src={filter} alt="/" />
                </div>
            </div>

            <div className={style.searchDiv}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={style.serchInput}
                    placeholder='Поиск...'
                    onClick={() => setIsOpen(true)}
                />
                <div className={style.container}>
                    <ul className={style.ulAutoComplete}>
                        {
                            (productsList && isOpen) && productsList.map((item, i) => (
                                <div key={i}>
                                    <li
                                        onClick={itemClickHandler}
                                        className={style.liAutoComplete}
                                    >
                                        {item.title}
                                    </li>
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header