const Mongoose = require("mongoose");
const Task = require("./task");
const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
    trim: true,
  },
  tids: [Mongoose.Schema.Types.ObjectId],
});

const User = Mongoose.model("user", UserSchema);
module.exports = User;
