const express = require('express');

const router = express.Router();
const commandController = require("../controller/commandController")
const auth =require("../middleware/auth")
const hasRole =require("../middleware/hasRole")

router.post('/add',auth,commandController.addCommand)
router.get('/',auth,commandController.getAllCommand)







module.exports=router;