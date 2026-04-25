import { useState, useEffect } from "react";
import { fetchProducts, fetchCategories } from "../services/ProductService";

function useProducts(page){

    const [products, setProducts] = useState([]);
    const[pages, setPages] = useState(1);
    const [error,setError] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
    
        async function loadProducts(){
          try{
            setLoading(true);
            setError(null);
    
            const data = await fetchProducts(page,8);
            setProducts(data.products);
            setPages(data.pages);
    
            
    
          }catch(err){
            setError("Failed to load products")
          }finally{
            setLoading(false);
          }
          
        };
        loadProducts();
    },[page]);

    return {products,loading,error,pages}
}

export default useProducts;