const mongoose  = require('mongoose')

const regularFessAssignSchema = mongoose.Schema({

    student:{ //Student Id
        type:mongoose.Schema.Types.ObjectId,
        ref:'student',
        required:true
    },
    branch:{ //Branch ID
        type:mongoose.Schema.Types.ObjectId,
        ref:'branch',
        required:true
    },
    feeType: {
        type: String,
        enum: ['monthly', 'term', 'semester', 'annual'],
        required: true,
      },
    feeAmount:{
        type:Number,
        required:true
    },
    totalCount:{ // It's used for term and semester and annual.Month we already Know
        type:Number,
        default:1
    },
    dueDate:{
        type:Date
    }

},
{
  timestamps: true,
});


const RegularFeeAssign = mongoose.model('regularFeeAssign',regularFessAssignSchema);
module.exports = RegularFeeAssign;