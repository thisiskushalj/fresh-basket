import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const PantryStaples = () => {
    const { products } = useAppContext();
    const [grainsProducts, setGrainsProducts] = useState([]);

    useEffect(() => {
        const filtered = products.filter(
            (p) => p.category === "Grains" && p.inStock !== false
        );
        if (filtered.length > 0) {
            const shuffled = filtered.sort(() => 0.5 - Math.random());
            setGrainsProducts(shuffled.slice(0, 5));
        }
    }, [products]);

    return (
        <div className='mt-10'>
            <p className='text-2xl md:text-3xl font-medium'>Pantry Staples</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {grainsProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default PantryStaples;