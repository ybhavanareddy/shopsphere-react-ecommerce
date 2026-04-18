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