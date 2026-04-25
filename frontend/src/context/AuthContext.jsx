import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({children}) {
    //store token and username in state and localStorage for persistence
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );
    const [username, setUsername] = useState(
        localStorage.getItem("userName") || ""
    );

    
    //deriveed state

    const isLoggedIn = !!token;

    function login(name,userToken){
        setToken(userToken);
        setUsername(name);

        localStorage.setItem("token", userToken);
        localStorage.setItem("userName",name);
    }

    function logout(){
        setToken(null);
        setUsername("");

        localStorage.removeItem("token");
        localStorage.removeItem("userName");
    }
    

    return (
        <AuthContext.Provider value={{isLoggedIn,login,logout, username,token}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider
