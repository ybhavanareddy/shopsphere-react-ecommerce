import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom";

function Home() {

  const {username} = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
       <h1 className="text-3xl font-bold mb-4">
          Welcome, {username} 👋
       </h1>

       <p className="mb-6 text-gray gray-600">
          Explore our products and enjoy shopping!
       </p>

       <Link 
        to="/products"
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Go to Products
        </Link>
    </div>
  )
}

export default Home