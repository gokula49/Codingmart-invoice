// External dependancies
const mongoose = require("mongoose");

const challanSchema = new mongoose.Schema({
  //use _id as challestimatean number
  
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:"User"
  },
  customer_name: {
    type:String,
    required: false
    // ref: "Customer",
    // type: String,
    // required: true,
  },
 
  reference: {
    type: String,
    required: false,
  },
  
  challan_number: {
    type: String,
    required: false,
  },
  delivery_challan_date: {
    type: String,
    required: false,
  },
  challan_type: {
    type: String,
    required: false,
  },
  items: [
    {
      name: {
        type: String,
        required: false,
      },
      quantity: {
        type: String,
        required: false,
      },
      amount: {
        type: String,
        required: false,
      },
      selling_price: {
        type: String,
        required: false,
      },
    },
  ],
  customer_notes: {
    type: String,
    required: false,
  },
  discount: {
    type: String,
    required: false,
  },
  tcs: {
    type: String,
    required: false,
  },
  total: {
    type: String,
    required: false,
  },
  terms: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Challan", challanSchema);