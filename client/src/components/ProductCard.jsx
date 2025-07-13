import React from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();


    return product && (
        <div onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} className="border border-gray-500/20 rounded-md px-3 py-2 bg-white 
  w-[160px] sm:w-[180px] md:w-56 max-w-[224px]">
            <div className="group cursor-pointer flex items-center justify-center px-2 h-40">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full ">{product.name}</p>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-[#6eaa3f]">
                        {currency}{product.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">                        {currency}{product.price}</span>
                    </p>
                    <div onClick={(e) => { e.stopPropagation(); }} className="text-primary">
                        {!cartItems[product._id] ? (
                            <button className="flex items-center justify-center gap-1 bg-primary/5 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer" onClick={() => addToCart(product._id)} >
                                ADD
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/5 border border-primary/40 rounded select-none">
                                <button onClick={() => { removeFromCart(product._id) }} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => { addToCart(product._id) }} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;