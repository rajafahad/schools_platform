const mongoose = require("mongoose");

const schoolOwnerSchema = new mongoose.Schema({

    firstName:{
        type:String,
       
    },
    lastName:{
        type:String,
        
    },
    institutionName:{
        type:String,
        
    },
    contactNumber:{
        type:Number
    },
    whatsapp:{
        type:Number,
       
    },
    email:{
        type:String,
    },
   
    qualification:{
        type:String,

    },
    dateOfBirth:{
        type:Date
    },
    gender:{
        type:String,
        enum:['male','female','other']
    },
    country:{
        type:String
    },
    city:{
        type:String,
    },
    state:{
        type:String
    },
    address:{
        type:String
    }

});
const SchoolOwner = mongoose.model('schoolOwner',schoolOwnerSchema);
module.exports = SchoolOwner;