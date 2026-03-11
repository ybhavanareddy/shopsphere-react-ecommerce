export async function fetchProducts(){
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
}

export async function fetchProductById(id){
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await response.json();
  return data;
}