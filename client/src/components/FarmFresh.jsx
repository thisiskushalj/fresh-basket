import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const FarmFresh = () => {
    const { products } = useAppContext();
    const [freshProducts, setFreshProducts] = useState([]);

    useEffect(() => {
        const freshCategories = ["fruits", "vegetables"];

        const filteredProducts = products.filter(p =>
            p.inStock !== false &&
            freshCategories.includes(p.category?.toLowerCase())
        );

        if (filteredProducts.length > 0) {
            const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
            setFreshProducts(shuffled.slice(0, 5));
        }
    }, [products]);

    return (
        <div className='mt-10'>
            <p className='text-2xl md:text-3xl font-medium'>Farm Fresh</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {freshProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default FarmFresh;