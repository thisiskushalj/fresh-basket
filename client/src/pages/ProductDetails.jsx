import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();

    const [relatedProducts, setRelatedProducts] = useState([]);

    const product = products.find((item) => item._id === id);

    useEffect(() => {
        if (products.length > 0 && product) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter(
                (item) => product.category === item.category && item._id !== product._id
            );
            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [products, product]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return product && (
        <div className="mt-30">
            <p>
                <Link to={'/'}>Home</Link> /
                <Link to={'/products'}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="border border-gray-500/30 rounded overflow-hidden max-w-md">
                    <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium text-[#545454]">{product.name}</h1>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">
                            MRP: {currency}{product.price}
                        </p>
                        <p className="text-2xl font-medium text-primary">
                            MRP: {currency}{product.offerPrice}
                        </p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    {product.inStock === false ? (
                        <div className="mt-10 py-3 text-center text-red-500 font-semibold text-lg border border-red-300 bg-red-50 rounded">
                            Out of Stock
                        </div>
                    ) : (
                        <div className="flex items-center mt-10 gap-4 text-base">
                            <button
                                onClick={() => addToCart(product._id)}
                                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    addToCart(product._id);
                                    navigate('/cart');
                                }}
                                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
                            >
                                Buy now
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* --------- Related Products --------- */}
            <div className="flex flex-col items-center mt-20">
                <div className="flex flex-col items-center w-max">
                    <p className="text-3xl font-medium text-[#545454]">Related Products</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 mt-6 w-full">
                    {relatedProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>

                <button
                    onClick={() => {
                        navigate('/products');
                        scrollTo(0, 0);
                    }}
                    className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
                >
                    See more
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;