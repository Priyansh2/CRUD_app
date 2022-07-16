const Mongoose = require("mongoose")
const UsertasksSchema = new Mongoose.Schema({
  user_id:{
    type:String,
    required: true,
  },
  usertasks_id:{
    type:String,
  }
})

const User = Mongoose.model("user", UserSchema)
module.exports = User

