import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList/ProductList';
import Basket from './pages/Basket/Basket';

const App = () => {
    const {tg} = useTelegram()
    const [addedItems, setAddedItems] = useState([])

    useEffect(() => {
        tg.ready()
    }, [])

    return (
        <div>
            <Routes>
                <Route index element={<ProductList addedItems={addedItems} setAddedItems={setAddedItems} />} />
                <Route path="/basket" element={<Basket addedItems={addedItems} setAddedItems={setAddedItems} />} />
            </Routes>
        </div>
    )
}

export default App;
