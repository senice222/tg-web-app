import React, { useState } from 'react'
import style from './Header.module.scss'
import filter from '../../assets/filter.png'
import { useDebounce } from '../../hooks/useDebounce'
import { useNavigate } from "react-router-dom";
import { products } from '../../utils/products';

const Header = () => {
    const [value, setValue] = useState("")
    const navigate = useNavigate()
    const debouncedValue = useDebounce(value, 300)
    const [isOpen, setIsOpen] = useState(true);

    const itemClickHandler = (e) => {
        const clickedProduct = e.target.textContent
        setValue(clickedProduct)
        const choseUser = products.filter(item => item.username === clickedUsername)
        const productUrl = `/profile/${choseUser[0]._id}`
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
                            (products && isOpen) && users.map((item, i) => (
                                <div key={i}>
                                    <li
                                        onClick={itemClickHandler}
                                        className={style.liAutoComplete}
                                    >
                                        {item.username}
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