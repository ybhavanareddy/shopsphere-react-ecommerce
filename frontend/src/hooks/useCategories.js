import { useEffect, useState } from "react";
import { fetchCategories } from "../services/productService";

function useCategories() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchCategories();
        setCategories(data);

      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();

  }, []);

  return { categories, loading, error };
}

export default useCategories;