const express = require("express");
const router = express.Router();
const { register, login, update, deleteUser } = require("./auth");
const {
  add_task,
  edit_task,
  delete_task,
  sort_task,
  search_task,
  change_task_status,
  inapp_notifier,
  get_all_task,
  //auto_reminder,
} = require("../utils");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(update);
router.route("/deleteUser").delete(deleteUser);
router.route("/createTask").post(add_task);
router.route("/editTask").put(edit_task);
router.route("/deleteTask").delete(delete_task);
router.route("/sortTask").get(sort_task);
router.route("/searchTask").get(search_task);
router.route("/changeTaskStatus").put(change_task_status);
router.route("/notify").post(inapp_notifier);
router.route("/get_all_tasks").get(get_all_task);
//router.route("/autoReminder").get(auto_reminder);

module.exports = router;
