const mongoose=require('mongoose');
require('dotenv').config();
const databaseURL="mongodb+srv://pirates123:pirates123@techpirates.inpsa.mongodb.net/Rahul?retryWrites=true&w=majority";
const connectDB=async()=>{
    try{
       const connect=await mongoose.connect(databaseURL);
       console.log(`MongoDB connected : ${connect.connection.host}`) 
       console.log(`Database Using : ${connect.connections[0].name  }`)
    }catch(err){
        console.log(`MongoDB connection ERROR: ${err}`);
    }
}
module.exports={connectDB}
