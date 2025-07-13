// Creating a global context to share data across components
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets"
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(); // AppContext: the context box

// AppContextProvider: wraps the app and provides shared values
export const AppContextProvider = ({children})=> {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setisSeller] = useState(false)
    const [showUserLogin, setshowUserLogin] = useState(false)
    const [products, setProducts] = useState([])

    const [cartItems, setCartItems] = useState({})


    const [searchQuery, setsearchQuery] = useState({})

    // Fetch Seller Status
    const fetchSeller = async ()=>{
        try {
            const {data} = await axios.get('/api/seller/is-auth');
            if(data.success) {
                setisSeller(true)
            } else {
                setisSeller(false)
            }
        } catch (error) {
                setisSeller(false)
        }
    }

    // Fetch User Auth Status , User Data and Cart Items
    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setUser(null)
        }
    }

    // Fetch All Products
    const fetchProducts = async ()=>{
        try {
            const {data} = await axios.get('/api/product/list')
            if(data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
                toast.error(error.message) 
        }
    }

    //Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    //Update cart item quantity
    const updateCartItem = (itemId, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    //Remove product from cart
    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId]==0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData)
    }

    //Get cart item count
    const getCartCount = () => {
        let totalCount = 0;
        for(const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    //Get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let itemInfo = products.find((product)=>product._id === items);
            if(cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(()=>{
        fetchUser()
        fetchSeller()
        fetchProducts()
    },[])

    // Update Database Cart Items
    useEffect(()=>{
        const updateCart = async ()=>{
            try {
                const {data} = await axios.post('/api/cart/update', {cartItems})
                if(!data.success){
                    toast.error(data.message)
                }
            } catch (error) {
                    toast.error(error.message)
            }
        }

        if(user){
            updateCart()
        }
    },[cartItems])


    const value = {navigate, user, setUser, isSeller, setisSeller, showUserLogin, setshowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setsearchQuery, getCartAmount, getCartCount, axios, fetchProducts, setCartItems};
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

// useAppContext: custom hook to use the shared data inside components
export const useAppContext = () => {
    return useContext(AppContext)
}