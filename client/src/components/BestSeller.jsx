import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
    const { products } = useAppContext();
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        const inStockProducts = products.filter(p => p.inStock !== false);
        if (inStockProducts.length > 0) {
            const shuffled = inStockProducts.sort(() => 0.5 - Math.random());
            setRandomProducts(shuffled.slice(0, 5));
        }
    }, [products]);

    return (
        <div id="BestSellers" className='mt-10'>
            <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {randomProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;