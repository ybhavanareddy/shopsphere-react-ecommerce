import { useState, useEffect } from "react";
import { fetchProducts } from "../services/ProductService";

function useProducts(page, category,search, sort){

    const [products, setProducts] = useState([]);
    const[pages, setPages] = useState(1);
    const [error,setError] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
    
        async function loadProducts(){
          try{
            setLoading(true);
            setError(null);
    
            const data = await fetchProducts(page,8, category, search,sort);
            setProducts(data.products);
            setPages(data.pages);
    
            
    
          }catch(err){
            setError("Failed to load products")
          }finally{
            setLoading(false);
          }
          
        };
        loadProducts();
    },[page, category, search,sort]);

    return {products,loading,error,pages}
}

export default useProducts;