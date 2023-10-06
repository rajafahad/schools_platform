const mongoose = require('mongoose')

const userDataSchema = new mongoose.Schema({
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"role"
    },
    login:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'login'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        refPath: 'userType',
        required:true
    },
    userType:{
        type:String,
        enum: ['owner', 'staff', 'student', 'parent','account'],
        required:true
    }
})

const UserData = mongoose.model('UserData',userDataSchema);
module.exports = UserData;