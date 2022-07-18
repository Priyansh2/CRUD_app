const connectDB = require("./db");
const schedule = require("node-schedule");

let check_due_tasks = require("./utils");
const cors = require("cors");
connectDB();
const express = require("express");
const app = express();
const PORT = 5000;
const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);
// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
app.use(cors());
app.use(express.json());
app.use("/", require("./auth/route"));

const job = schedule.scheduleJob("* *  18 7 *", function () {
  check_due_tasks.check_due_tasks();
});
//if (C == 0) {

//C = 1;
//exports.C = C;
//}
