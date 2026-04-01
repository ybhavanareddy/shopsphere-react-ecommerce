import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );
    const [username, setUsername] = useState(
        localStorage.getItem("userName") || ""
    );

    

    function login(name){
        setIsLoggedIn(true);
        setUsername(name);

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName",name);
    }

    function logout(){
        setIsLoggedIn(false);    
        setUsername("");

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
    }
    

    return (
        <AuthContext.Provider value={{isLoggedIn,login,logout, username}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider
