import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import ProductList from '../ProductList/ProductList'
import { url } from '../../utils/url'

const Home = ({ addedItems, setAddedItems }) => {
    const [value, setValue] = useState("")
    const [region, setRegion] = useState([])
    const [category, setCategory] = useState([])
    const [allProducts, setAllProducts] = useState([])
    
    useEffect(() => {
        const getProducts = () => {
            try {
                fetch(`${url}/internal/data`, {
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
                        setAllProducts(data);
                    })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getProducts();
    }, [category, region]);
    const products = allProducts.filter(item => item.coordinates.length > 0)
    return (
        <>
            <Header value={value} setValue={setValue} products={products} category={category} setCategory={setCategory} region={region} setRegion={setRegion} />
            <ProductList filteredProducts={products} addedItems={addedItems} setAddedItems={setAddedItems} />

        </>
    )
}

export default Home