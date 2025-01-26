import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify"

export const PageContext = createContext();

const PageContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();
    const [date, setDate] = useState("")
    const [login, setLogin] = useState(false)
    const [production, setProduction] = useState([])
    const [orders, setOrders] = useState([]);
    const discount = 0
    const currency = "₹"

    const formattingDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
    
        if (dd < 10) dd = '0' + d
        if (mm < 10) mm = '0' + mm;
    
        setDate(dd + '/' + mm + '/' + yyyy)
    }

    const retrieveOrder = async () => {
        try {
            const response = await axios.get(backendUrl+"/api/order/list")
            if(response.data.success){
                setOrders(response.data.orders)
            }else{
                console.error(response.data.message)
            }
        } catch (error) {
            console.error(error.message)
            toast.error("Error in Fetching Orders. Reload Page", { hideProgressBar:true, autoClose:2000 })
        }
        formattingDate();
    }

    const fetchProduction = async () => {
        try {
            const response = await axios.get(backendUrl+"/api/production/list")
            if(response.data.success){
                setProduction(response.data.productions)
            }else{
                console.error(response.data.message)
            }
        } catch (error) {
            console.error(error.message)
            toast.error("Error in Fetching Productions. Reload Page", { hideProgressBar:true, autoClose:2000 })
        }
    }

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

    const [products, setProducts] = useState([
        {
            _id : "1",
            img : "",
            name : "Dater",
            sp : 100,
            cp : 80
        },
        {
            _id : "2",
            img : "",
            name : "Mini dater",
            sp : 200,
            cp : 100
        },
        {
            _id : "3",
            img : "",
            name : "Approval",
            sp : 100,
            cp : 70
        }
    ])

    const designers = [
        {id:1,name : "Raghu"},
        {id:2,name : "Hayram"},
        {id:3,name : "Sriram"}
    ]


    useEffect(() => {
        retrieveOrder();
        fetchProduction();
    }, [])

    const value = {
        currency,
        backendUrl, discount,
        navigate,
        login, setLogin,
        orders, setOrders,
        date,
        clients, setClients,
        designers,
        production, setProduction, fetchProduction,
        products, setProducts
    }

    return (
        <PageContext.Provider value={value}>
            {props.children}
        </PageContext.Provider>
    )

}

export default PageContextProvider