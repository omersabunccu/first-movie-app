import { createContext, useContext, useEffect, useState } from "react";
import { userObserver } from "../firebase";

const AuthContext = createContext({currentUser:{}, setCurrentUser:()=>{}})

export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=>{
        userObserver(setCurrentUser)
    }, [])

    return <AuthContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
        </AuthContext.Provider>
}

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    return context;
}