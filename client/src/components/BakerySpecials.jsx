import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BakerySpecials = () => {
    const { products } = useAppContext();
    const [bakeryItems, setBakeryItems] = useState([]);

    useEffect(() => {
        const filtered = products.filter(p =>
            p.inStock !== false &&
            p.category?.toLowerCase() === 'bakery'
        );

        if (filtered.length > 0) {
            const shuffled = filtered.sort(() => 0.5 - Math.random());
            setBakeryItems(shuffled.slice(0, 5));
        }
    }, [products]);

    return (
        <div className='mt-10'>
            <p className='text-2xl md:text-3xl font-medium'>The Baker’s Choice</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {bakeryItems.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default BakerySpecials;