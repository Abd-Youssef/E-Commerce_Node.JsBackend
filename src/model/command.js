const mongoose = require("mongoose");
const { lineCommandSchema } = require("./lineCommand");

const commandSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
  products: [lineCommandSchema],
  date: {
    type: Number,
    required: false,
  },
  amount:{
    type:Number,
    required:true
  }
});
module.exports.Command = mongoose.model("command", commandSchema);
