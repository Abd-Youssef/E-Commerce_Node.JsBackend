const { Product } = require("../model/product");


function addProduct(req, res,next) {
  let { name, description, price, category, stock } = req.body;
  price=Number(price);
  stock=Number(stock);
  console.log(req.body);
  if (
    name &&
    description &&
    price &&
    category &&
    stock &&
    typeof price === "number" &&
    typeof stock === "number"
  ) {
    const product = new Product({
      name: name,
      description: description,
      price, // equivalent a price :price quand on a le méme nom de variable dans la bd
      category,
      stock,
      image:{
        data :req.file.filename,
        contentType:'image/png'
      },
    });
    product.save().then(()=>{
        res.status(201).json({ status: 201 , message:"product Created" });
    })
  }
  else{
    res.status(400).json({ status: 400 , message:"check your data" });

  }
}
function updateProduct(req,res,next) {
    const { name, description, price, category, stock } = req.body;
    if (
        name &&
        description &&
        price &&
        category &&
        stock 
        // &&typeof price === "number" &&
        // typeof stock === "number"
      ) {
        Product.findByIdAndUpdate({_id:req.params.id},{
            $set: {
                name: name,
                description: description,
                price :price, 
                category:category,
                stock:stock,
                image:{
                  data :req.file.filename,
                  contentType:'image/png'
                },
            },
          })
        .then((product)=>{
            return res.status(200).json({ status: 200, message: "product updated" ,data: product,});
        })
        .catch ((error)=> {
            return res.status(404).json({ status: 404, message: error.message });
          })
      }
      else{
        res.status(400).json({ status: 400 , message:"check your data" });
    
      }
    
}

function getProductByid(req,res,next) {
    Product.findById({
        _id:req.params.id,
    }).then((product)=>{

        res.status(200).json({
            status: 200,
            message: "Product found",
            data: product,
          }); 
    })

}

async function getAllProduct(req, res,next) {
    try {

      const product = await Product.find()
      // product.map((val, key) => {
      //   console.log("key",key);
      //   console.log("val",val);

      // })
      res.status(200).json({ status: 200 , data: product})
    } catch (error) {
      res.status(500).json({ status: 500 , message: error});
    }
  }
  async function getAllCategories(req, res,next) {
    try {

      const product = await Product.find()
      categories =[]
      product.map((val, key) => {
        if (!categories.includes(val.category.toUpperCase())) {
          categories.push(val.category.toUpperCase()); 
        } 
      })
      res.status(200).json({ status: 200 , data: categories})
    } catch (error) {
      res.status(500).json({ status: 500 , message: error});
    }
  }
  


exports.addProduct = addProduct; 

exports.getProductByid = getProductByid;
exports.updateProduct = updateProduct;
exports.getAllProduct = getAllProduct; 
exports.getAllCategories = getAllCategories; 



