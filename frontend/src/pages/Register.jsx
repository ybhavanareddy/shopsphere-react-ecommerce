import { useState, useContext,useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../services/authService";

function Register() {
  const {isLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser({ name, email, password });

      if (response.message === "User registered successfully") {
        alert("Registration successful ✅");
        navigate("/login");
      } else {
        alert(response.message);
      }

    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  useEffect(() => {
  if (isLoggedIn) {
    navigate("/");
  }
}, [isLoggedIn]);

//Auto Focus on username input when component mounts
  useEffect(()=>{
    usernameRef.current?.focus();
  },[]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Register
        </h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
            Username
        </label>
        <input
          ref={usernameRef}
          type="text"
          placeholder="Name"
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
            Email
        </label>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white w-full py-3 rounded-lg hover:opacity-90 transition font-semibold"
        >
          Register
        </button>

        <p className ="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span 
            className="text-purple-600 font-medium hover:underline cursor-pointer"
            onClick={()=> navigate("/login")}
          >
            Login 
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;