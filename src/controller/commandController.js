const { Command } = require("../model/command");
const { Product } = require("../model/product");

async function addCommand(req, res, next) {
  try {
    const { products } = req.body;
    if (products.length) {
      let numberValidate = 0;
      let amount = 0;

      const listProducts = await Product.find({
        _id: { $in: products.map((el) => el.product) },
      });
      for (let index = 0; index < listProducts.length; index++) {
        const element = listProducts[index];

        const indexelement = products.findIndex(
          (el) => el.product === element._id.toString()
        );
        
        if (indexelement !== -1) {
          if (products[indexelement].quantity <= element.stock) {
            numberValidate++;
            amount += element.price * products[indexelement].quantity;
          } 
        } else {
          break;
        }
      }


      if (numberValidate === products.length) {
        const command = new Command({
          products: products,
          userId: req.user._id,
          date: new Date(),
          amount: amount,
        });
        command.save().then(async () => {
          for (let index = 0; index < products.length; index++) {
            await Product.findByIdAndUpdate(products[index].product, {
              $inc: { stock: -products[index].quantity },
            });
          }

          res.status(201).json({ status: 201, message: "Command Created" });
        });
      } else {
        res.status(400).json({ status: 400, message: "Product Stack problem" });
      }
    } else {
      res.status(400).json({ status: 400, message: "check your data" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}
async function getAllCommand(req, res, next) {
  try {
    const commands = await Command.find()
      .populate({ path: "userId", select: ["first_name", "last_name"] })
      .populate("products.product");
    res.status(201).json({ status: 201, data: commands });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

exports.addCommand = addCommand;
exports.getAllCommand = getAllCommand;
