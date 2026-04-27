import Product from "../models/Product.js";

//Get all products 

export const getProducts = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const category = req.query.category;
    const search = req.query.search;
    const sort = req.query.sort;

    let sortOption = {createdAt: -1};//default sorting by newest

    if (sort === "price-low") {
      sortOption.price = 1;
    } else if (sort === "price-high") {
        sortOption.price = -1;
    } else if (sort === "rating") {
        sortOption.rating = -1;
    }

    let query = {};

    if (category && category !== "all"){//if category is provided and not "all", filter by category
        query.category = category;
    }

    if (search){
        query.title = {$regex: search, $options:"i"}; //case-insensitive search
    }

    

    const skip = (page - 1) * limit;//calculate how many products to skip for pagination

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
        .select("-__v -createdAt -updatedAt")
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      products
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//Get single product by ID
export const getProductsById = async(req,res)=> {

    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
    
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }

    res.json(product);

    } catch (error) {
    res.status(500).json({message: error.message});
    }
};

//Add new Product 

export const createProduct = async(req,res)=>{
    try{
        const {title,price,thumbnail,rating,category,description} = req.body;
        //Basic Validation 
        if(!title || !price){
                return res.status(400).json({
                message:"Title and price are required"
            });
        }

        const product = new Product({
            title,
            price,
            thumbnail,
            rating,
            category,
            description

         });
        
        
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
       
};

//update produuct 

export const updateProduct = async(req,res)=>{

    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        const {title,price,thumbnail,rating,category,description} = req.body;

        if(title) product.title = title;
        if(price) product.price = price;
        if(thumbnail) product.thumbnail = thumbnail;
        if(rating) product.rating = rating;
        if(category) product.category = category;
        if(description) product.description = description;

        const updatedProduct = await product.save();
        res.json(updatedProduct);

    }catch (error) {
        res.status(500).json({message: error.message});
    }
 
};

//Delete product 

export const deleteProduct = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        await product.deleteOne();

        res.json({
            message:"Product deleted successfully",
            product
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//get categories from products
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


