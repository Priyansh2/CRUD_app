//const Task = require("./model/task")
const User = require("./model/user");
const TaskSchema = require("./model/task");
const Mongoose = require("mongoose");
const moment = require("moment");
const { isUndefined } = require("lodash");

//let C = 0;
//exports.C = C;

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "guyzackmartin56@gmail.com",
    pass: "oiifimbtkinihrlz",
  },
});
transporter.verify().then(console.log).catch(console.error);

let message = {
  from: "guyzackmartin56@gmail.com",
  to: "priyanshagarwal02may@gmail.com",
  subject: "Due Task",
  text: "Hello, Please complete the task by EOD",
};

function query_match(query, task) {
  return (
    task.task_name.includes(query) || task.task_description.includes(query)
  );
}
function isdue(task) {
  let ddate = moment(task.task_duedate, "DD-MM-YYYY");
  let current = moment().startOf("day");
  let left = moment.duration(ddate.diff(current)).asDays();
  //console.log(ddate + " " + current + " " + left);
  if (left <= 1 && left > 0) return true;
}
exports.check_due_tasks = () => {
  User.find().then((users) => {
    for (let user of users) {
      //if (user.username !== "priyansh") continue;
      let duetasks = [];
      let user_id = user._id;
      let db_name = "task" + "_" + user_id;
      let Task = Mongoose.model(db_name, TaskSchema);

      console.log(user.username + " ");
      Task.find().then((tasks) => {
        for (let task of tasks) {
          if (isdue(task)) {
            duetasks.push(task.task_name);
            //console.log(task.task_name);
            message.to = user.email;
            message.text =
              "Hello, Please complete the following task by EOD: " +
              "Task Name -> " +
              task.task_name +
              "Task Description -> " +
              task.task_description +
              "Task Priority -> " +
              task.task_priority;
            transporter.sendMail(message, (err, info) => {
              if (err) {
                console.log(err);
              } else {
                console.log(info);
              }
            });
          }
        }
      });
      //send an email to user with tasks -> duetasks
    }
  });
  //C = require("./server");
};

exports.inapp_notifier = async (req, res, next) => {
  const { u_id, t_duedate } = req.body;
  //console.log(moment(t_duedate, "DD-MM-YYYY").startOf("day").toDate());
  let db_name = "task" + "_" + u_id;
  let Task = Mongoose.model(db_name, TaskSchema);
  await Task.find({
    task_duedate: moment(t_duedate, "DD-MM-YYYY").startOf("day").toDate(),
  }).then((tasks) => {
    for (let task of tasks) {
      console.log(task.task_name + " " + task.task_duedate);
    }

    res.status(200).json({
      message: `Send the task list with dueDate ${t_duedate}`,
      tasks,
    });
  });
};
exports.change_task_status = async (req, res, next) => {
  const { u_id, t_id, t_status } = req.body;
  let db_name = "task" + "_" + u_id;
  let Task = Mongoose.model(db_name, TaskSchema);
  await Task.findById(t_id)
    .then((task) => {
      let temp = task.task_status;
      task.task_status = t_status;
      res.status(200).json({
        message: `Changed the status of task from ${temp} to ${t_status}`,
      });
    })
    .catch((err) => {
      res.staus(400).josn({
        message: `Failed to change task status to ${t_status}`,
        error: err.message,
      });
    });
};

exports.search_task = async (req, res, next) => {
  //console.log(req.query);
  const { u_id } = req.body;
  const { query } = req.query.q;
  query = query.trim();
  let searchResult = [];
  let db_name = "task" + "_" + u_id;
  let Task = Mongoose.model(db_name, TaskSchema);
  await Task.find().then((tasks) => {
    for (let task of tasks) {
      if (query_match(query, task)) {
        // match query and so populate this task on frontend
        searchResult.push(task);
      }
    }
    res
      .status(200)
      .json({ message: "This is the search result", searchResult });
  });
};

exports.sort_task = async (req, res, next) => {
  //user has taskids
  //Sort alphabetically, duedate (by deafult) , creation date
  const { q } = req.query;
  let u_id = q;
  const sort_order = "asc",
    sort_mode = "Alphabetically";
  if (!["Alphabetically", "Duedate", "Creationdate"].includes(sort_mode))
    return res.status(400).json({ message: "Incorrect Sort Mode" });

  if (!["asc", "dsc"].includes(sort_order))
    return res.status(400).json({ message: "Incorrect Sort Order" });

  let db_name = "task" + "_" + u_id;
  let Task = Mongoose.model(db_name, TaskSchema);

  if (sort_mode == "Alphabetically") {
    await Task.find()
      .collation({ locale: "en" })
      .sort({ task_name: "asc" })
      .then((tasks) => {
        for (let task of tasks) {
          console.log(task.task_name);
        }
        res.status(200).json({ message: "Sorted by Alphabetically", tasks });
      });
  } else if (sort_mode == "Duedate") {
    await Task.find()
      .sort({ task_duedate: "asc" })
      .then((tasks) => {
        for (let task of tasks) {
          console.log(task.task_name + " " + task.task_duedate);
        }
        res.status(200).json({ message: "Sorted by DueDate", tasks });
      });
  } else {
    await Task.find()
      .sort({ task_creationdate: "asc" })
      .then((tasks) => {
        for (let task of tasks) {
          console.log(task.task_name + " " + task.task_creationdate);
        }
        res.status(200).json({ message: "Sorted by CreationDate", tasks });
      });
  }
};

exports.add_task = async (req, res, next) => {
  let { t_name, t_description, t_status, t_priority, t_duedate, u_id } =
    req.body;
  console.log(
    t_name +
      " " +
      t_description +
      " " +
      t_status +
      " " +
      t_priority +
      " " +
      t_duedate +
      " " +
      u_id
  );
  t_status = t_status ? "Completed" : "Pending";
  t_priority = t_priority ? "Important" : "Unimportant";
  console.log(t_status + " " + t_priority);
  if (!["Important", "Unimportant"].includes(t_priority)) {
    return res
      .status(400)
      .json({ message: `Incorrect task priorty  ${t_priority}` });
  }

  if (!["Pending", "Overdue", "Completed"].includes(t_status)) {
    return res
      .status(400)
      .json({ message: `Incorrect task status  ${t_status}` });
  }

  let db_name = "task" + "_" + u_id;
  let Task = Mongoose.model(db_name, TaskSchema);
  try {
    await Task.create({
      task_name: t_name,
      task_description: t_description,
      task_status: t_status,
      task_priority: t_priority,
      task_duedate: t_duedate,
    })
      .then((task) => {
        console.log(u_id + " " + task._id);

        /*User.findOneAndUpdate(
            {_id: u_id},
            {$push: {tids:  task._id}}
        )*/

        res.status(200).json({ message: "Task successfully created", task });
      })
      .catch((error) => {
        res
          .status(401)
          .json({ message: "Unable to create task", error: error.message });
      });
  } catch (error) {
    console.log("Task - ok");
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.get_all_task = async (req, res, next) => {
  const { q } = req.query;
  u_id = q;
  console.log(req.query);
  //console.log("ok" + " " + u_id);
  let db_name = "task" + "_" + u_id;
  let Task = Mongoose.model(db_name, TaskSchema);
  await Task.find()
    .then((tasks) => {
      res.status(200).json({
        message: "Sending client all requested task information",
        tasks,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "unable to send reuested task information",
        error: err.message,
      });
    });
};

exports.edit_task = async (req, res, next) => {
  let { t_name, t_status, t_description, t_priority, t_duedate } = req.body;
  t_status = t_status ? "Completed" : "Pending";
  t_priority = t_priority ? "Important" : "Unimportant";
  const { q1, q2 } = req.query;
  (u_id = q1), (t_id = q2);
  console.log(
    u_id +
      " " +
      t_id +
      " " +
      t_name +
      " " +
      t_description +
      " " +
      t_priority +
      " " +
      t_duedate +
      " " +
      t_status
  );
  let db_name = "task" + "_" + u_id;
  let Task = Mongoose.model(db_name, TaskSchema);
  await Task.findById(t_id)
    .then((task) => {
      task.task_name = t_name;
      task.task_description = t_description;
      task.task_priority = t_priority;
      task.task_duedate = t_duedate;
      task.task_status = t_status;
      task.save((error) => {
        if (error) {
          res.status(400).json({
            message: "Unable to update task information",
            error: error.message,
          });
          process.exit(1);
        }
        res
          .status(201)
          .json({ message: "Task Information updated successfully", task });
      });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message });
    });
};

exports.delete_task = async (req, res, next) => {
  const { q1, q2 } = req.query;
  (u_id = q1), (t_id = q2);
  console.log(u_id + " " + t_id);
  let db_name = "task" + "_" + u_id;
  let Task = Mongoose.model(db_name, TaskSchema);
  await Task.findById(t_id)
    .then((task) => task.remove())
    .then((task) => {
      console.log("ok!!");
      res.status(201).json({ message: "Task successfulyl deleted", task });
    })
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Unable to delete task", error: error.message })
    );
};
