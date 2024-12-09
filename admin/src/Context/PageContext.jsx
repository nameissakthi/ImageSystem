import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PageContext = createContext();

const PageContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();
    
    const orders = [
        {
            bankName : "HDFC Bank",
            bankLogo : "https://www.shutterstock.com/image-vector/hdfc-bank-logo-vector-indian-260nw-2351748935.jpg",
            production : "Designing Process",
            summary : 80,
            products : [
                "MOUND 2 41MM X 17MM","MOUND 2 41MM X 17MM","MOUND 2 41MM X 17MM","MOUND 2 41MM X 17MM"
            ],
        },
        {
            bankName : "UCO Bank",
            bankLogo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJEUTA-c9nIkxjBgMIHw6prRBZhF0wzWN-w&s",
            production : "Development Process",
            summary : 95,
            products : [
                "MOUND 2 41MM X 17MM","MOUND 2 41MM X 17MM","MOUND 2 41MM X 17MM"
            ],
        },
    ]
    
    const [login, setLogin] = useState(false)

    const value = {
        backendUrl,
        navigate,
        login, setLogin,
        orders
    }

    return (
        <PageContext.Provider value={value}>
            {props.children}
        </PageContext.Provider>
    )

}

export default PageContextProvider