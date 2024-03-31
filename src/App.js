import { useEffect } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';

const App = () => {
    const {tg} = useTelegram()

    useEffect(() => {
        tg.ready()
    }, [])

    return (
        <div>
            <Routes>
                <Route index element={<ProductList />} />
                {/* <Route path='item/:id' element={<DetailedProduct />} /> */}
            </Routes>
        </div>
    )
}

export default App;
