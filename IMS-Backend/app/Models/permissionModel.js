const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'role',
      required: true,
    },
    moduleType: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'moduleType',
      required: true,
    },
    isAdd: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    isView: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    isEdit: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    isDelete: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
  },
  {
    timestamps: true,
  }
);

const Permission = mongoose.model("permission", permissionSchema);
module.exports = Permission;
