const BASE_URL = `${import.meta.env.VITE_API_URL}/api/products`;

export async function fetchProducts(page=1, limit=8, category="all", search="", sort="default"){
  const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}&category=${category}&search=${search}&sort=${sort}`);
  const data = await response.json();
  return data;
}

export async function fetchProductById(id){
  const response = await fetch(`${BASE_URL}/${id}`);
  const data = await response.json();
  return data;
}

export async function fetchCategories(){
  const response = await fetch(`${BASE_URL}/categories`);
  const data = await response.json();
  return data.map(cat => ({
    slug:cat,
    name:cat
  }));
}

