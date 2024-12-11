import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

export const PageContext = createContext();

const PageContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();
    const [date, setDate] = useState("")
    const [login, setLogin] = useState(false)

    const formattingDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
    
        if (dd < 10) dd = '0' + d
        if (mm < 10) mm = '0' + mm;
    
        setDate(dd + '/' + mm + '/' + yyyy)
    }
    
    const [orders, setOrders] = useState([
        {
            _id : "1",
            orderNumber : 123456,
            ordererName : "Sakthi",
            bankName : "HDFC Bank",
            bankLogo : "https://www.shutterstock.com/image-vector/hdfc-bank-logo-vector-indian-260nw-2351748935.jpg",
            production : "Designing Process",
            summary : 0,
            Date: "10/12/2024",
            Time: "12:56:05PM",
            phoneno : "1234567890",
            email : "sakthi@gmail.com",
            products : [
                {id: 1, name: "Dater", qty: 2, img: logo},
                {id: 2,name: "Mini Dater", qty: 2, img: logo},
                {id: 3,name: "Approval", qty: 2, img: logo},
                {id: 4,name: "Paid", qty: 1, img: logo},
                {id: 5,name: "Decline", qty: 1, img: logo},
                {id: 6,name: "Fake Note", qty: 1, img: logo},
                {id: 7,name: "Number", qty: 1, img: logo},
                {id: 8,name: "Locker", qty: 4, img: logo},
            ],
            selectedProducts : [

            ],
            address : "Coimbatore",
        },
        {
            _id : "2",
            orderNumber : 123457,
            ordererName : "Sakthi",
            bankName : "UCO Bank",
            bankLogo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJEUTA-c9nIkxjBgMIHw6prRBZhF0wzWN-w&s",
            production : "Development Process",
            summary : 0,
            Date: "10/12/2024",
            Time: "12:56:05PM",
            phoneno : "1234567890",
            email : "sakthi@gmail.com",
            products : [
                {id: 1,name: "Dater", qty: 2, img: logo},
                {id: 2,name: "Mini Dater", qty: 2, img: logo},
                {id: 3,name: "Approval", qty: 2, img: logo},
                {id: 4,name: "Paid", qty: 1, img: logo},
                {id: 5,name: "Decline", qty: 1, img: logo},
                {id: 6,name: "Fake Note", qty: 1, img: logo},
            ],
            selectedProducts : [
                
            ],
            address : "Coimbatore",
        },
        {
            _id : "3",
            orderNumber : 123458,
            ordererName : "Sakthi",
            bankName : "UCO Bank",
            bankLogo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJEUTA-c9nIkxjBgMIHw6prRBZhF0wzWN-w&s",
            production : "Development Process",
            summary : 0,
            Date: "09/12/2024",
            Time: "12:56:05PM",
            phoneno : "1234567890",
            email : "sakthi@gmail.com",
            products : [
                {id: 1,name: "Dater", qty: 2, img: logo},
                {id: 2,name: "Mini Dater", qty: 2, img: logo},
                {id: 3,name: "Approval", qty: 2, img: logo},
                {id: 4,name: "Paid", qty: 1, img: logo},
            ],
            selectedProducts : [
                
            ],
            address : "Coimbatore",
        },
    ]);

    const [clients, setClients] = useState([
        {
            _id : "1",
            ifsc : "1234",
            password : "1234",
            name : "HDFC",
            logo : "https://www.shutterstock.com/image-vector/hdfc-bank-logo-vector-indian-260nw-2351748935.jpg",
            address : "coimbatore",
            products : [
                "dater","mini dater","approval","paid","decline","fake note","number","locker"
            ]
        },
        {
            _id : "2",
            ifsc : "1235",
            password : "1234",
            name : "UCO",
            logo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJEUTA-c9nIkxjBgMIHw6prRBZhF0wzWN-w&s",
            address : "coimbatore",
            products : [
                "dater","mini dater","approval","paid","decline","fake note","number","locker"
            ]
        },
    ]);

    useEffect(() => {
        formattingDate()
    }, [])

    const value = {
        backendUrl,
        navigate,
        login, setLogin,
        orders, setOrders,
        date,
        clients, setClients,
    }

    return (
        <PageContext.Provider value={value}>
            {props.children}
        </PageContext.Provider>
    )

}

export default PageContextProvider