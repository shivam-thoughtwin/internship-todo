/* eslint-disable func-names */
const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Inprogress", "Completed"],
      default: "Pending",
    },
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = model("Todo", todoSchema);
