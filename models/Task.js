// models/Task.js
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  status:      { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  priority:    { type: String, enum: ["low", "medium", "high"], default: "medium" },
  dueDate:     { type: Date },
  assignedTo:  { type: String, ref: "User" },
  createdBy:   { type: String, ref: "User", required: true },
  identifier:  { type: String }
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);








// import mongoose from "mongoose";

// const productionModel = new mongoose.Schema({
//     name:String,
//     email:String,
//     mobile:Number,
//     message:String,
// });

// export const Product = mongoose.models.inrain9953 || mongoose.model("inrain9953", productionModel)