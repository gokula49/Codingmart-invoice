var mongoose = require('mongoose');

const organSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
           required:true,
           ref:"User"
      },
   
    org_name:{
        type:String,
        required:true,
    },
    business_location:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    currency:{
        type:String,
        required:false,
    },
    language:{
        type:String,
        required:false,
    },
    time_Zone:{
        type:String,
        required:false
    }
    // invoice_status:{
    //   type:String,
    //   required:false
    // }
    
})

module.exports = mongoose.model('Organ',organSchema);