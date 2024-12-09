import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PageContext = createContext();

const PageContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();

    const [login, setLogin] = useState(false)

    const value = {
        backendUrl,
        navigate,
        login, setLogin
    }

    return (
        <PageContext.Provider value={value}>
            {props.children}
        </PageContext.Provider>
    )

}

export default PageContextProvider