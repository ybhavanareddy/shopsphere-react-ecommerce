import { useEffect, useState } from 'react'

import ProductGrid from '../components/ProductGrid'
import { fetchProducts } from '../services/ProductService.js'
import { fetchCategories } from '../services/ProductService.js'
import ProductSkeleton from '../components/ProductSkelton'


function Products() {

  const [search,setSearch] = useState("");
  const [debouncedSearch, setDebouncedsearch] = useState("");


  const [products, setProducts] = useState([]);
  const[loading, setLoading] = useState(true);

  const [error,setError] = useState(null)

  const[categories, setCategories] = useState([]);
  const[slectedCategory, setSelectedCategory] = useState("all");

  const[sortOption,setSortOption]  = useState("default");


  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;


  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedsearch(search);

    },500);
    return () => clearTimeout(timer);
  },[search]);

//Pagination Bug fix logic
  useEffect(() => {
    if (currentPage !== 1) {
    setCurrentPage(1);
  }
}, [debouncedSearch, slectedCategory, sortOption]);

//scroll to top when page changes
useEffect(()=>{
  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
},[currentPage]);


useEffect(()=>{

    async function loadProducts(){
      try{
        const data = await fetchProducts();
        setProducts(data);

        const categoryData = await fetchCategories();
        setCategories(categoryData);

      }catch(err){
        setError("Failed to load products")
      }finally{
        setLoading(false);
      }
      
    }
    loadProducts();
},[]);




  let filteredProducts = products.filter((product)=> {

    const matchesSearch = 
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase());

    const matchesCategory = 
      slectedCategory === "all" || product.category === slectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (sortOption === "price-low") {

  filteredProducts.sort((a, b) => a.price - b.price);

}

if (sortOption === "price-high") {

  filteredProducts.sort((a, b) => b.price - a.price);

}

if (sortOption === "rating") {

  filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);

}

//Pagination Logic 

const indexOfLastProduct = currentPage * productsPerPage

const indexOfFirstProduct = indexOfLastProduct - productsPerPage 

const currentProducts = filteredProducts.slice(
  indexOfFirstProduct,indexOfLastProduct
);

const totalPages = Math.ceil(filteredProducts.length / productsPerPage);


if (error) {

  return (

    <div className="flex flex-col items-center justify-center h-screen">

      <h1 className="text-xl font-semibold mb-4">
        {error}
      </h1>

      <button
        onClick={() => window.location.reload()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Retry
      </button>

    </div>

  );

}



  return (
    <>
      {loading ? (
          <div className="grid grid-cols-3 gap-6 p-8">

          {Array.from({ length: 6 }).map((_, index) => (

            <ProductSkeleton key={index} />

          ))}

         </div>
      ) : (
          <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>
        Products
      </h1>

      <div className='mb-4'>
        <label className='mr-2 font-semibold'>
          Sort By:
        </label>
        <select 
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='border px-2 py-1 rounded'
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

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

      {currentProducts.length === 0 ? (

        <div className="text-center mt-10 text-lg font-semibold">

          No products found

        </div>

      ) : (

        <ProductGrid products={currentProducts} />

      )}

      <div className='flex justify-center mt-8 gap-2'>
        <button 
        onClick={()=> setCurrentPage(currentPage-1)}
        disabled = {currentPage === 1}
        className='px-3 py-1 border rounded'
        >
          Prev
        </button>
        {Array.from({length: totalPages}).map((_,index)=>(

          <button 
            key={index}
            onClick={()=> setCurrentPage(index+1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index+1 ? "bg-blue-900 text-white":""
            }`}
          >
            {index+1}
          </button>
        ))}


        
        <button 
        onClick={()=> setCurrentPage(currentPage+1)}
        disabled = {currentPage === totalPages}
        className='px-3 py-1 border rounded'
        >
          Next
        </button>

      </div>
      
    </div>
      )}
    
    </>
    
  )
}

export default Products