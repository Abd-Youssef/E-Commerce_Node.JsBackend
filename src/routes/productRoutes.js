const express = require('express');

const router = express.Router();
const productController = require("../controller/productController")
const auth =require("../middleware/auth")
const hasRole =require("../middleware/hasRole")

router.post('/add',auth,hasRole("admin"),productController.addProduct)
router.get('/find/:id',auth,productController.getProductByid)
router.put('/update/:id',auth,hasRole("admin"),productController.updateProduct)
router.get('/',auth,productController.getAllProduct)
router.get('/Categories',auth,productController.getAllCategories)






module.exports=router;  