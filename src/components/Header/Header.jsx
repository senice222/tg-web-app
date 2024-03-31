import React from 'react'
import style from './Header.module.scss'
import { useTelegram } from '../../hooks/useTelegram'

const Header = () => {
    const {onClose, user} = useTelegram()

    return (
        <div className={style.header}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={style.username}>
                {user?.username}
            </span>
        </div>
    );
}

export default Header