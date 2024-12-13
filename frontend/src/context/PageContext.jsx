import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify"

export const PageContext = createContext();

const PageContextProvider = (props) => {

    const currency = "₹"

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();

    const [login, setLogin] = useState(false)
    const [orderConfirm, setOrderConfirm] = useState(false)
    const [cart, setCart] = useState([])
    const [order, setOrder] = useState({
        name : "",
        email : "",
        phoneno : "",
        billNumber : "",
        cart : [],
        bankIfsc : "ESMF0001924",
        bankName : "ESAF Bank",
        bankLogo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs8R4K8CldBXma-71sNRe7zl2stWdcMJIilQ&s",
        address : "Thiruvanmiyur"
    })

    const newOrder = async () => {
        try {
            const response = await axios.post(backendUrl+"/api/order/new", { order })

            if(response.data.success){
                toast.success("Order Placed Successfully")
                setCart([])
            }else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.name === item.name
                        ? { ...cartItem, qty: cartItem.qty + 1, totalAmt: (cartItem.qty+1)*item.price }
                        : cartItem
                );
            } else {
                return [...prevCart, { name: item.name, img: item.img, qty: 1, price: item.price, totalAmt: item.price }];
            }
        });
        toast.success('Added To Cart', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    };

    const incrementQty = (itemName) => {
        setCart((prevCart) =>
            prevCart.map((cartItem) =>
                cartItem.name === itemName
                    ? { ...cartItem, qty: cartItem.qty + 1 }
                    : cartItem
            )
        );
    };

    const decrementQty = (itemName) => {
        setCart((prevCart) =>
            prevCart.map((cartItem) =>
                cartItem.name === itemName && cartItem.qty > 1
                    ? { ...cartItem, qty: cartItem.qty - 1 }
                    : cartItem
            ).filter((cartItem) => cartItem.qty > 0)
        );
    };

    const removeFromCart = (itemName) => {
        setCart((prevCart) => prevCart.filter((cartItem) => cartItem.name !== itemName));
    };

    const products = [
        {name: "Dater", img: "", price: 100},
        {name: "Mini Dater", img: "", price: 100},
        {name: "Approval", img: "", price: 100},
        {name: "Paid", img: "", price: 100},
        {name: "Decline", img: "", price: 100},
        {name: "Fake Note", img: "", price: 100},
        {name: "Number", img: "", price: 100},
        {name: "Locker", img: "", price: 100},
    ]

    // useEffect(()=>{
    //     if(order.billNumber)
    // },[order])

    const value = {
        backendUrl,
        navigate,
        login, setLogin,
        products,
        cart, addToCart, decrementQty, incrementQty, removeFromCart, setCart,
        order, setOrder, newOrder,
        orderConfirm, setOrderConfirm,
        currency
    }

    return (
        <PageContext.Provider value={value}>
            {props.children}
        </PageContext.Provider>
    )

}

export default PageContextProvider