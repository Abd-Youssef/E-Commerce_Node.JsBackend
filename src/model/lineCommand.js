const mongoose = require("mongoose");

const lineCommandSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "product",
  },
});
exports.lineCommandSchema = lineCommandSchema;
