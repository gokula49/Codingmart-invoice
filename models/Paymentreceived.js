const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const paymentSchema = new mongoose.Schema({
   user_id:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:"User"
   },
   email:{
       type:String,
       required:true
   },

    customer_name: {
        type: String,
        required: true,
    },
    amount_received: {
        type: String,
        required: false,
    },
    payment_date: {
        type: String,
        required: false,
    },
    payment: {
        type: String,
        required: false,
    },
    payment_mode: {
        type: String,
        required: false,
    },
    reference: {
        type: String,
        required: false,
    },
  
});

module.exports = mongoose.model("Paymentreceived",paymentSchema);