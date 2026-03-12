import { useEffect, useState } from 'react'

import ProductGrid from '../components/ProductGrid'
import { fetchProducts } from '../services/ProductService'
import { fetchCategories } from '../services/ProductService'

function Products() {

  const [search,setSearch] = useState("");
  const [debouncedSearch, setDebouncedsearch] = useState("");


  const [products, setProducts] = useState([]);
  const[loading, setLoading] = useState(true);

  const[categories, setCategories] = useState([]);
  const[slectedCategory, setSelectedCategory] = useState("all");


  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedsearch(search);

    },500);
    return () => clearTimeout(timer);
  },[search]);

  useEffect(()=>{
    async function loadProducts(){

      const data = await fetchProducts();
      setProducts(data);

      const categoryData = await fetchCategories();
      setCategories(categoryData);

      
      setLoading(false);
    }
    loadProducts();
  },[]);




  const filteredProducts = products.filter((product)=> {

    const matchesSearch = 
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase());

    const matchesCategory = 
      slectedCategory === "all" || product.category === slectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {loading ? (
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-xl font-semibold">
                Loading products...
            </h1>
          </div>
      ) : (
          <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>
        Products
      </h1>

      <div className='flex gap-4 mb-6 flex-wrap'>
        <button 
          onClick = {()=> setSelectedCategory("all")}
          className={`px-3 py-1 border rounded ${
            slectedCategory === "all" ? "bg-blue-900 text-white" : "bg-white"
          }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button 
              key={category}
              onClick={()=> setSelectedCategory(category)}
              className={`px-3 py-1 border rounded ${
                    slectedCategory === category ? "bg-blue-900 text-white" : "bg-white"
              }`}
              >
                {category}
            </button>
          ))}
      </div>

      <input 
        type ="text"
        placeholder='Search products...'
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        className='border p-2 mb-6 w-full'
      />

      <ProductGrid products={filteredProducts}/>
      
    </div>
      )}
    
    </>
    
  )
}

export default Products