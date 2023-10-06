const mongoose = require('mongoose')

const feePaymentHistorySchema = mongoose.Schema({
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'branch',
        required:true
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    feeType:{
        type:String,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    paidAmount:{
        type:Number,
        required:true
    }

},{ timestamps: true })

const FeePaymentHistory = mongoose.model('feePaymentHistory',feePaymentHistorySchema);
module.exports = FeePaymentHistory;