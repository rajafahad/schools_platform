const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      unique: true,
    },
    sorted: {
      type: Number,
      default: 0,
    },
    isSystem: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

moduleSchema.pre("save", function (next) {
  if (this.name && !this.prefix) {
    this.prefix = this.name.replace(/\s/g, "").toLowerCase();
  }
  if (this.prefix) {
    this.prefix = this.prefix.replace(/\s/g, "").toLowerCase();
  }
  next();
});



const Module = mongoose.model("module", moduleSchema);
module.exports = Module;
