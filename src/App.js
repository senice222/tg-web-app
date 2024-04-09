import { useEffect, useState } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList/ProductList';
import Basket from './pages/Basket/Basket';
import ChoosePaymentType from './pages/ChoosePaymentType/ChoosePaymentType';
import Success from './pages/Success/Success'
import Cancel from './pages/Cancel/Cancel'
import Home from './pages/Home/Home';

const App = () => {
    const {tg} = useTelegram()
    const [addedItems, setAddedItems] = useState([])
    
    useEffect(() => {
        tg.ready()
    }, [])

    return (
        <div>
            <Routes>
                <Route index element={<Home addedItems={addedItems} setAddedItems={setAddedItems} />} />
                <Route path="/basket" element={<Basket addedItems={addedItems} setAddedItems={setAddedItems} />} />
                <Route path="/typeOfPayment" element={<ChoosePaymentType />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
            </Routes>
        </div>
    )
}

export default App;
