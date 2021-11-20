const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const customerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    
    ref: "user",
    required:true,
    
  },
  customer_type: {
    type: String,
    required: false,
  },
  primary_contact: {
    type: String,
    required: false,
  },
  first_name: {
    type: String,
    required: true,
  },
   last_name: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: false,
  },
  customer_name: {
    type: String,
    required: false,
  },
  customer_email: {
    type: String,
    required: false,
  },
  work_phone: {
    type: String,
    required: false,
  },
  mobile: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  pan:{
    type:String,
    
  },
  curbalance:{
    type:String,
    
  },
  paymentT:{
    type:String,
    
  },
  language:{
    type:String,
    
  },
  facebook:{
    type:String,
    
  },
  twitter:{
    type:String,
    
  },
  attention:{
    type:String,
    
  },
  country:{
    type:String,
    
  },
  addre:{
    type:String,
    
  },
  city:{
    type:String,
    
  },
  state:{
    type:String,
    
  },
  code:{
    type:String,
    
  },
  phone:{
    type:String,
    
  },
  fax:{
    type:String,
    
  },
  textarea:{
    type:String,
    
  },


});


module.exports = mongoose.model("Customer", customerSchema);