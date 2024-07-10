const tg = window.Telegram.WebApp
tg.expand();

export const useTelegram = () => {
    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }

    return {
        tg,
        id: tg.initDataUnsafe?.user?.id,
        queryId: tg.initDataUnsafe?.query_id,
        onClose,
        onToggleButton
    }
}