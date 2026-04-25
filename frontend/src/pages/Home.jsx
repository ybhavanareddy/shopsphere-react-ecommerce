import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom";

function Home() {

  const {username} = useContext(AuthContext);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-purple-50 to-pink-50">

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Welcome, {username} 👋
        </h1>

        <p className="text-gray-600 mb-6 max-w-md">
          Discover amazing products, best deals, and a seamless shopping experience.
        </p>

        <Link 
          to="/products"
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
        >
          Explore Products
        </Link>

    </div>
  )
}

export default Home