const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
user_id:{
        type:mongoose.Schema.Types.ObjectId,
           required:true,
           ref:"User"
},
date:{
    type: String,
    required: true,
},
category_name:{
    type: String,
    required:true,
},
amount:{
    type: String,
    required:true,
},
invoice:{
    type: String,
    required:false,
},
notes:{
    type: String,
    required:false,
},
customer_name:{
    type:String,
    required:false,
},
})
module.exports = mongoose.model("Expense", expenseSchema);