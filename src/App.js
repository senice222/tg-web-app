import { useEffect } from 'react';
import './App.css';
import Home from './pages/Home/Home';
const tg = window.Telegram.WebApp

const App = () => {

    useEffect(() => {
        tg.ready()
    }, [])

    return (
        <div>
            <Home />
        </div>
    )
}

export default App;
