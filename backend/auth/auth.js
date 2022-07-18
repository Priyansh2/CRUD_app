const User = require("../model/user");
const bcrypt = require("bcryptjs");
const TaskSchema = require("../model/task");
const Mongoose = require("mongoose");

function handleValidationError(err, res, consoleLog = false) {
  const messages = [];
  //console.log(err)
  //console.log(err.errors)
  for (let field in err.errors) {
    messages.push(err.errors[field].message);
    consoleLog && console.log(err.errors[field].message);

    res.status(401).json({ message: messages });
  }
}

exports.register = async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(username + " " + password + " " + email);
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        username,
        password: hash,
        email,
      })
        .then((user) => {
          res.status(200).json({ message: "User successfully created", user });
        })
        .catch((error) => {
          if (error.name == "ValidationError")
            return handleValidationError(error, res, true);
          res.status(401).json({
            message: "Unable to create existing user!",
            error: error.mesage,
          });
        });
    });
  } catch (error) {
    console.log("ok");
    res.status(400).json({
      message: "Duplicate entry found",
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email + " " + password);

  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password not present",
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        result
          ? res.status(200).json({ message: "Login successful", user })
          : res.status(400).json({ message: "Login not succesful" });
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  console.log(role + " " + id);
  // First - Verifying if role and id is presnt
  if (role && id) {
    // Second - Verifying if the value of role is admin
    if (role === "admin") {
      // Finds the user with the id
      await User.findById(id)
        .then((user) => {
          // Third - Verifies the user is not an admin
          if (user.role !== "admin") {
            user.role = role;
            user.save((error) => {
              //Monogodb error checker
              if (error) {
                res
                  .status(400)
                  .json({ message: "An error occurred", error: error.message });
                process.exit(1);
              }
              res.status(201).json({ message: "Update successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    } else {
      res.status(400).json({ message: "Role is not admin" });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { u_id } = req.body;
  await User.findById(u_id)
    .then((user) => user.remove())
    .then((user) => {
      let db_name = "task" + "_" + u_id;
      let Task = Mongoose.model(db_name, TaskSchema);
      Task.collection.drop();
      console.log("User's tasks collection removed!!");
      res.status(201).json({ message: "User successfully deleted", user });
    })
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Unable to delete user", error: error.message })
    );
};
