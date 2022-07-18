const Mongoose = require("mongoose");

const TaskSchema = new Mongoose.Schema({
  task_name: {
    type: String,
    default: "",
    trim: true,
  },
  task_description: {
    type: String,
    default: "",
    trim: true,
  },
  task_status: {
    type: String,
    required: true,
    default: "Pending",
    trim: true,
  },
  task_priority: {
    type: String,
    default: "Unimportant",
    required: true,
    trim: true,
  },
  task_duedate: {
    type: String,
    required: true,
  },
  task_creationdate: {
    type: Date,
    required: true,
    default: Date.now,
    unique: true,
  },
});
/*TaskSchema.pre("save", function (next) {
  this.task_duedate = moment(this.task_duedate).format("DD-MM-YYYY");
  next();
});*/
const Task = Mongoose.model("task", TaskSchema);
module.exports = Task;
module.exports = TaskSchema;
