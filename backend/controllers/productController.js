//Get all products 

export const getProducts = (req,res)=> {

     const products = [
        {
            id:1,
            title:"iPhone 15",
            price:79999,
            thumbnail:"https://m.media-amazon.com/images/I/71MlcO29QOL._SL1500_.jpg",
            rating:4.5
        },
        {
            id:2,
            title:"Samsung Galaxy S23",
            price:69999,
            thumbnail:"https://m.media-amazon.com/images/I/91w+qj8n9sL._SL1500_.jpg",
            rating:4.3
        },
        {
            id:3,
            title:"Google Pixel 7",
            price:59999,
            thumbnail:"https://m.media-amazon.com/images/I/71w+qj8n9sL._SL1500_.jpg",
            rating:4.2
        }
    ];
    res.json(products);
};

//Get single product by ID
export const getProductsById = (req,res)=> {

    const products = [
        {
            id:1,
            title:"iPhone 15",
            price:79999,
            thumbnail:"https://m.media-amazon.com/images/I/71MlcO29QOL._SL1500_.jpg",
            rating:4.5
        },
        {
            id:2,
            title:"Samsung Galaxy S23",
            price:69999,
            thumbnail:"https://m.media-amazon.com/images/I/91w+qj8n9sL._SL1500_.jpg",
            rating:4.3
        },
        {
            id:3,
            title:"Google Pixel 7",
            price:59999,
            thumbnail:"https://m.media-amazon.com/images/I/71w+qj8n9sL._SL1500_.jpg",
            rating:4.2
        }
    ];

    const productId = parseInt(req.params.id);
    const product = products.find((item) => item.id === productId);

    if(!product){
        return res.status(404).json({message:"Product not found"});
    }

    res.json(product);
};

//Add new Product 

export const createProduct = (req,res)=>{
    const {title,price,thumbnail,rating} = req.body;

    //Basic Validation 
    if(!title || !price){
        return res.status(400).json({
            message:"Title and price are required"
        });
    }
    const newProduct = {
        id:Date.now(), //temp unique id
        title,
        price,
        thumbnail,
        rating
    };
    res.status(201).json({
        message:"Product created successfully",
        product: newProduct
    });
};

//update produuct 

export const updateProduct = (req,res)=>{

    const productId = parseInt(req.params.id);

    const {title,price,thumbnail,rating} = req.body;    
    
    const products = [
        {
            id:1,
            title:"iPhone 15",
            price:79999,
            thumbnail:"https://m.media-amazon.com/images/I/71MlcO29QOL._SL1500_.jpg",
            rating:4.5
        },
        {
            id:2,
            title:"Samsung Galaxy S23",
            price:69999,
            thumbnail:"https://m.media-amazon.com/images/I/91w+qj8n9sL._SL1500_.jpg",
            rating:4.3
        },
        {
            id:3,
            title:"Google Pixel 7",
            price:59999,
            thumbnail:"https://m.media-amazon.com/images/I/71w+qj8n9sL._SL1500_.jpg",
            rating:4.2
        }
    ];

    
    const product = products.find((item) => item.id === productId);

    if(!product){
        return res.status(404).json({message:"Product not found"});
    }

    //update field(only if provided)
    if(title) product.title = title;
    if(price) product.price = price;
    if(thumbnail) product.thumbnail = thumbnail;
    if(rating) product.rating = rating;

    res.json({
        message:"Product updated successfully",
        product
    });
};