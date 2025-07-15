import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const CoolInTheHeat = () => {
    const { products } = useAppContext();
    const [drinkItems, setDrinkItems] = useState([]);

    useEffect(() => {
        const filtered = products.filter(p =>
            p.inStock !== false &&
            p.category?.toLowerCase() === 'drinks'
        );

        if (filtered.length > 0) {
            const shuffled = filtered.sort(() => 0.5 - Math.random());
            setDrinkItems(shuffled.slice(0, 5));
        }
    }, [products]);

    return (
        <div className='mt-10'>
            <p className='text-2xl md:text-3xl font-medium'>Chill Zone</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {drinkItems.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CoolInTheHeat;