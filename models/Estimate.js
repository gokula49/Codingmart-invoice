// External dependancies
const mongoose = require("mongoose");

const estimateSchema = new mongoose.Schema({
  //use _id as estimate number

  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
},
  customer_name: {
    type:String,
    required: true,
   
  },
 
  reference: {
    type: String,
    required: false,
  },
  estimate_number: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  estimate_date: {
    type: String,
    required: true,
  },
  expiry_date: {
    type: String,
    required: false,
  },
  sales_person: {
    type: String,
    required: false,
  },
  project_name: {
    type: String,
    required: false,
  },
  subject: {
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

module.exports = mongoose.model("Estimate", estimateSchema);