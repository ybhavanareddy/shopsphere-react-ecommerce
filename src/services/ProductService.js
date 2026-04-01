export async function fetchProducts(){
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
}

export async function fetchProductById(id){
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await response.json();
  return data;
}

export async function fetchCategories(){
  const response = await fetch("https://dummyjson.com/products/categories");
  const data = await response.json();
  return data;
}

