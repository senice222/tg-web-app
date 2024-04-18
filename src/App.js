import { useEffect, useState } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import Basket from './pages/Basket/Basket';
import Success from './pages/Success/Success'
import Cancel from './pages/Cancel/Cancel'
import Home from './pages/Home/Home';
import SucceedPayment from './pages/SucceedPayment/SucceedPayment';
import axios from 'axios';
import { setCookie } from 'nookies';

const App = () => {
    const {tg, id} = useTelegram()
    const [addedItems, setAddedItems] = useState([])
    
    useEffect(() => {
        tg.ready()
        const getUserLang = async () => {
            const {data} = await axios.get("https://skateboardjumpers.agency/internal/getUser/6527850384")
            setCookie(null, 'lang', data.lang, {
                path: '/'
            })
        }
        getUserLang()
    }, [])

    return (
        <div>
            <Routes>
                <Route index element={<Home addedItems={addedItems} setAddedItems={setAddedItems}  />} />
                <Route path="/basket" element={<Basket addedItems={addedItems} setAddedItems={setAddedItems} />} />
                <Route path="/succeedPayment" element={<SucceedPayment />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
            </Routes>
        </div>
    )
}

export default App;
