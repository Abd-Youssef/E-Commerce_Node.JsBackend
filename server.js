require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
var http = require("http");
const { normalizePort } = require("./common");
var server = http.createServer(app);
const userRoutes = require("./src/routes/UserRoutes");
const productRoutes = require("./src/routes/productRoutes");
const commandRoutes = require("./src/routes/commandRoutes");
app.use(express.json());
app.use(cors());

const multer = require ('multer');
const mongoose = require("mongoose");

var port = normalizePort(process.env.PORT || "8000");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connexion à MangoDB réussir !"))
  .catch((err) => {
    console.log("connexion à MangoDB échouée"), err.message;
  });

  // const Storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, '/tmp/my-uploads')
  //   },
  //   filename:  (req, file, cb) =>{
  //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  //     cb(null, file.fieldname + '-' + uniqueSuffix)
  //   }
  // }) 
  // const upload = multer({ storage: Storage })

  // app.post("/uploads", (req, res) => {
  //   upload(req, res ,(err)=>{
  //     if (err){
  //       console.log("uploads error",err)
  //     }
  //     else{
  //       const new
  //     }
  //   })
  // });

server.listen(port, () => {
  console.log("Server is running on port", port);
});

app.get("/", (req, res) => {
  res.send("Express server is up and running");
});

app.use("/", userRoutes);
app.use("/product", productRoutes);
app.use("/command", commandRoutes);
