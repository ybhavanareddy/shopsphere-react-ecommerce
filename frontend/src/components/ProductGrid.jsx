import ProductCard from "./ProductCard"

function ProductGrid({products}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product)=>(
            
                <ProductCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    thumbnail= {product.thumbnail}
                    rating={product.rating}
                />
        ))}
    
    </div>
  )
}

export default ProductGrid