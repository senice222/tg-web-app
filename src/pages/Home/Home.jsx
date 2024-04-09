import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import ProductList from '../ProductList/ProductList'
// import { products } from '../../utils/products'

const Home = ({ addedItems, setAddedItems }) => {
    const [value, setValue] = useState("")
    const [region, setRegion] = useState([])
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        const getProducts = () => {
            try {
                fetch('http://localhost:8000/internal/data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({categories: category, regions: region})
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.json();
                    })
                    .then(data => {
                        setProducts(data);
                    })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getProducts();
    }, [category, region]);

    return (
        <>
            <Header value={value} setValue={setValue} products={products} category={category} setCategory={setCategory} region={region} setRegion={setRegion} />
            <ProductList filteredProducts={products} addedItems={addedItems} setAddedItems={setAddedItems} />
            <button >товаров на </button>

        </>
    )
}

export default Home