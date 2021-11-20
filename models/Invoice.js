// External dependancies
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const invoiceSchema = new mongoose.Schema({
  //use _id as invoice number
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },
  customer_name: {
    // type: mongoose.Schema.Types.ObjectId,
    // required: true,
    // ref: "Customer",
    type: String,
    required: false,
  },
  invoice_number: {
    type: String,
    required: false,
  },
  order_no: {
    type: String,
    required: false,
  },
  invoice_date: {
    type: String,
    required: false,
  },
  terms: {
    type: String,
    required: false,
  },
  due_date: {
    type: String,
    required: false,
  },
  sales_person: {
    type: String,
    required: false,
  },
  subject: {
    type: String,
    required: false,
  },
  // status: {
  //   type: String,
  //   required: false,
  // },
  // balance_due: {
  //   type: String,
  //   required: false,
  // },
  
  
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
      rate: {
        type: String,
        required: false,
      },
      amount: {
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
  terms_condition: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);