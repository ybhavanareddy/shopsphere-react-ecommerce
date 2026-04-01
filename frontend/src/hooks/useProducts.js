import { useState, useEffect } from "react";
import { fetchProducts, fetchCategories } from "../services/ProductService";

function useProducts(){
    const [products, setProducts] = useState([]);
    const[loading, setLoading] = useState(true);
    const [error,setError] = useState(null)
    const[categories, setCategories] = useState([]);

    useEffect(()=>{
    
        async function loadProducts(){
          try{
            setLoading(true);
            setError(null);
    
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

    return {products,loading,error,categories}
}

export default useProducts;