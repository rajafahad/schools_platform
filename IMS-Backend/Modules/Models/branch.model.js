const mongoose = require("mongoose");
const { Schema } = mongoose;

const branchSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    schoolName: {
      type: String,
      required: [true,"School Name is required"],
    },
    branchName: {
      type: String,
      required: [true,"Branch Name is Required"],
    },
    schoolLevel: {
      type: String,
      required: [true,"Select School Level"],
    },
    email: {
      type: String,
      required: [true,"School Email is Required"],
    },

    contactNumber: {
      type: Number,
      required: [true,"Contact Number is required"],
    },
    
    whatsapp: {
      type: Number,
      required: [true,"Branch WhatsApp is Required"],
    },
    currency: {
      type: String,
    },
    symbol: {
      type: String,
    },
    address: {
      type: String,
      required: [true,"Branch Address is required"],
    },
    city: {
      type: String,
      required: [true,"Branch City is Required"],
    },
    state: {
      type: String,
      required: [true,"Branch State/Province is Required"],
    },
    country: {
      type: String,
      required: [true,"Branch Country is Required"],
    },
  },
  {
    timestamps: true,
  }
);

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
