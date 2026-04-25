import { useEffect, useState, useMemo, useRef } from 'react'

import ProductGrid from '../components/ProductGrid'
import useProducts from '../hooks/useProducts';
import ProductSkeleton from '../components/ProductSkelton'


function Products() {
  const{products,loading,error,categories} = useProducts();

  const [search,setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");


  
  const[selectedCategory, setSelectedCategory] = useState("all");

  const[sortOption,setSortOption]  = useState("default");

  const inputRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;


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



const filteredProducts = useMemo(()=>{
      let result = products.filter((product)=> {

        const matchesSearch = 
          product.title.toLowerCase().includes(debouncedSearch.toLowerCase());

        const matchesCategory = 
          selectedCategory === "all" ||   product.category?.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesSearch && matchesCategory;
      });

      if (sortOption === "price-low") {

      result.sort((a, b) => a.price - b.price);

    }

    if (sortOption === "price-high") {

      result.sort((a, b) => b.price - a.price);

    }

    if (sortOption === "rating") {

      result.sort((a, b) => b.rating - a.rating);

    }
    return result;

},[products,debouncedSearch,selectedCategory,sortOption])
  
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
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-8 py-6">

          {Array.from({ length: 8 }).map((_, index) => (

            <ProductSkeleton key={index} />

          ))}

         </div>
      ) : (
      <div className='px-4 sm:px-6 md:px-8 py-6'>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-6'>
            Products
          </h1>
        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md py-3 rounded-lg shadow mb-6  p-4">

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

          <div className='flex flex-wrap gap-2 sm:gap-3 mb-6'>
            <button 
              onClick = {()=> setSelectedCategory("all")}
              className={`px-3 py-1 border rounded ${
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
                  className={`px-3 py-1 border rounded ${
                        selectedCategory === category.slug ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none" 
                                                          : "bg-white hover:bg-gray-100"
                  }`}
                  >
                    {category.name}
                </button>
              ))}
          </div>

          <input 
            ref = {inputRef}
            type ="text"
            placeholder='Search products...'
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            className='border p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
          />
        </div>

          {currentProducts.length === 0 ? (

            <div className="text-center mt-10 text-lg font-semibold">

              No products found

            </div>

          ) : (

            <ProductGrid products={currentProducts} />

          )}

          <div className='flex flex-wrap justify-center mt-8 gap-2'>
            <button 
            onClick={()=> setCurrentPage(currentPage-1)}
            disabled = {currentPage === 1}
            className='px-4 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50'
            >
              Prev
            </button>
            {Array.from({length: totalPages}).map((_,index)=>(

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
            disabled = {currentPage === totalPages}
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