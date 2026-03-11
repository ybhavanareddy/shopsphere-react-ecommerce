import ProductCard from "./ProductCard"

function ProductGrid({products}) {
  return (
    <div className="grid grid-cols-3 gap-6">
        {products.map((product)=>(
            
                <ProductCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                />
        ))}
    
    </div>
  )
}

export default ProductGrid