import { useState,useRef, useEffect } from "react"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const {login,isLoggedIn} = useContext(AuthContext);

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await loginUser({email,password});

      if(response.token){
        //store token in localStorage
        login(response.name,response.token);
      }
      else{
      alert(response.message || "Login failed");

      

    }  }catch(error){
      console.error("Login error:", error);
      alert("Login failed. Please try again.");

    }
    

  }

  //Auto Focus on username input when component mounts
  useEffect(()=>{
    emailRef.current?.focus();
  },[]);

//prevent  logged-in user from opening login 
useEffect(() => {
  if (isLoggedIn) {
    navigate("/",{replace:true});
  }
}, [isLoggedIn]);
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-50 to-pink-50">

      <form 
        onSubmit = {handleSubmit}
        className="w-full max-w-sm bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input 
            ref={emailRef}
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e)=> setEmail(e.target.value)}
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input 
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e)=> setPassword(e.target.value)}
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <button 
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white w-full py-3 rounded-lg hover:opacity-90 transition font-semibold"
        >
          Login
        </button>

        <p className ="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span 
            className="text-purple-600 font-medium hover:underline cursor-pointer"
            onClick={()=> navigate("/register")}
          >
            Register 
          </span>
        </p>
      </form>


    </div>
  )
}

export default Login