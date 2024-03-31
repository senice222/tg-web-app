import React from 'react'
const tg = window.Telegram.WebApp

const Header = () => {
    const onClose = () => tg.close()

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    );
}

export default Header