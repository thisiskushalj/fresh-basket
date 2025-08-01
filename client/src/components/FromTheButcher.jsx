import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const FromTheButcher = () => {
    const { products } = useAppContext();
    const [meatProducts, setMeatProducts] = useState([]);

    useEffect(() => {
        const meat = products.filter(
            p => p.category === "Meat" && p.inStock !== false
        );
        if (meat.length > 0) {
            const shuffled = meat.sort(() => 0.5 - Math.random());
            setMeatProducts(shuffled.slice(0, 5));
        }
    }, [products]);

    return (
        <div className='mt-10'>
            <p className='text-2xl md:text-3xl font-medium'>From the Butcher</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {meatProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default FromTheButcher;