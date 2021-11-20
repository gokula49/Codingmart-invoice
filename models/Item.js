// External dependancies
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },
  //use _id as estimate number


  type: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
 
  unit: {
    type: String,
    required: false,
  },
  selling_price: {
    type: String,
    required: true,
  },
  selling_description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Item", itemSchema);
