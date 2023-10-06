const mongoose = require("mongoose");

const moduleTypeSchema = new mongoose.Schema(
  {
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "module",
    },
    name: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
    },
    toView: {
      type: Number,
      default: 0,
      enum: [0, 1], // [ 0 => Not to View ] [ 1 => Yes to View ] 
    },
    toAdd: {
      type: Number,
      default: 0,
      enum: [0, 1], // [ 0 => Not to Add ] [ 1 => Yes to Add ]
    },
    toEdit: {
      type: Number,
      default: 0,
      enum: [0, 1], // [ 0 => Not to Edit ] [ 1 => Yes to Edit ]
    },
    toDelete: {
      type: Number,
      default: 0,
      enum: [0, 1], // [ 0 => Not to Delete ] [ 1 => Yes to Delete ]
    },
  },
  { timestamps: true }
);


moduleTypeSchema.pre("save", function (next) {
  if (this.name && !this.prefix) {
    this.prefix = this.name.replace(/\s/g, "").toLowerCase();
  }
  if (this.prefix) {
    this.prefix = this.prefix.replace(/\s/g, "").toLowerCase();
  }
  next();
});


const ModuleType = mongoose.model('moduleType',moduleTypeSchema);
module.exports= ModuleType;