import { useEffect, useState, useMemo, useRef } from 'react'

import ProductGrid from '../components/ProductGrid'
import useProducts from '../hooks/useProducts';
import useCategories from "../hooks/useCategories";
import ProductSkeleton from '../components/ProductSkelton'


function Products() {

  const [currentPage, setCurrentPage] = useState(1);
  const[selectedCategory, setSelectedCategory] = useState("all");
  const [search,setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const[sortOption,setSortOption]  = useState("default");

  const{products,loading,error,pages} = useProducts(currentPage, selectedCategory, debouncedSearch,sortOption);

  const {categories} = useCategories();

  const inputRef = useRef(null);

  
 


  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedSearch(search);

    },500);
    return () => clearTimeout(timer);
  },[search]);

//Pagination Bug fix logic
  useEffect(() => {
    
    setCurrentPage(1);
  
}, [debouncedSearch, selectedCategory, sortOption]);

//scroll to top when page changes
useEffect(()=>{
  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
},[currentPage]);

//Auto Focus on search input when component mounts
useEffect(()=>{
  if (!loading && inputRef.current){
    inputRef.current.focus();
  }

},[loading]);


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
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-8 py-6">

          {Array.from({ length: 8 }).map((_, index) => (

            <ProductSkeleton key={index} />

          ))}

         </div>
      ) : (
      <div className='px-4 sm:px-6 md:px-8 py-6'>
          
        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md py-3 rounded-lg shadow-sm mb-3  p-4">


          <input 
            ref = {inputRef}
            type ="text"
            placeholder='Search products...'
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            className='border px-3 py-2 mb-4 w-full rounded-lg text-sm sm:test-base focus:outline-none focus:ring-2 focus:ring-purple-400'
          />

          

          <div className='flex gap-3 overflow-x-auto whitespace-nowrap pb-2 mb-4 scrollbar-hide'>
            <button 
              onClick = {()=> setSelectedCategory("all")}
              className={`px-4 py-1 rounded-full border shrink-0 ${
                selectedCategory === "all" ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none" 
                                           : "bg-white hover:bg-gray-100"
              }`}
              >
                All
              </button>

              {categories.map((category) => (
                <button 
                  key={category.slug}
                  onClick={()=> setSelectedCategory(category.slug)}
                  className={`px-4 py-1 rounded-full border shrink-0 ${
                        selectedCategory === category.slug ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none" 
                                                          : "bg-white hover:bg-gray-100"
                  }`}
                  >
                    {category.name}
                </button>
              ))}
          </div>

        
          <div className='mb-4 flex flex-col sm:flex-row sm:items-center gap-2'>
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
        

          
        </div>

          {products.length === 0 ? (

            <div className="text-center mt-10 text-lg font-semibold">

              No products found

            </div>

          ) : (

            <ProductGrid products={products} />

          )}

          <div className='flex flex-wrap justify-center mt-8 gap-2'>
            <button 
            onClick={()=> setCurrentPage(currentPage-1)}
            disabled = {currentPage === 1}
            className='px-4 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50'
            >
              Prev
            </button>
            {Array.from({length: pages}).map((_,index)=>(

              <button 
                key={index}
                onClick={()=> setCurrentPage(index+1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index+1 ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                                          :"bg-white hover:bg-gray-100"
                }`}
              >
                {index+1}
              </button>
            ))}


            
            <button 
            onClick={()=> setCurrentPage(currentPage+1)}
            disabled = {currentPage === pages}
            className='px-4 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50'
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