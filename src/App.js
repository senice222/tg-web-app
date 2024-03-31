import './App.css';
const tg = window.Telegram.WebApp

const App = () => {

    useEffect(() => {
        tg.ready()
    }, [])

    const onClose = () => {
        tg.close()
    }

    return (
        <div>
            <button onClick={onClose}>1</button>
        </div>
    )
}

export default App;
