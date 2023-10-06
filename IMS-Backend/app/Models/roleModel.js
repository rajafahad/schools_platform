const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return !this.isSystem;
      },
    },
    name: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
    },
    isSystem: {
      type: Number,
      enum:[0,1],
      default: 0,
    },
  },
  { timestamps: true }
);

roleSchema.pre("save", function (next) {
  if (this.name && !this.prefix) {
    this.prefix = this.name.replace(/\s/g, "").toLowerCase();
  }
  if (this.prefix) {
    this.prefix = this.prefix.replace(/\s/g, "").toLowerCase();
  }
  next();
});

const Role = mongoose.model("role", roleSchema);
module.exports = Role;
