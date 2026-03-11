import { useState } from "react"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    login();
    navigate("/products");

  }
  return (
    <div className="flex justify-center items-center h-screen">

      <form 
        onSubmit = {handleSubmit}
        className="border p-8 rounded shadow w-80"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>
        <div className="mb-4">
          <label className="block mb-1">
            Email
          </label>
          <input 
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">
            Password
          </label>
          <input 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <button 
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>


    </div>
  )
}

export default Login