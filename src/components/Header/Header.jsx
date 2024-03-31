import React from 'react'
import style from './Header.module.scss'
import filter from '../../assets/filter.png'

const Header = () => {

    return (
        <div className={style.header}>
            <div className={style.filtersDiv}>
                <div className={style.container}>
                    <img src={filter} alt="/" />
                </div>
            </div>

            <div className={style.searchDiv}>
                <input className={style.serchInput} placeholder='Поиск...' />
            </div>
        </div>
    );
}

export default Header