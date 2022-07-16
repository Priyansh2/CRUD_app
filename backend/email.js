const nodemailer = require("nodemailer");
/*
auth: {
    user: "guyzackmartin56@gmail.com",
    pass: "oiifimbtkinihrlz",
  },
*/
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "guyzackmartin56@gmail.com",
    pass: "oiifimbtkinihrlz",
  },
});
transporter.verify().then(console.log).catch(console.error);

message = {
  from: "guyzackmartin56@gmail.com",
  to: "priyanshagarwal02may@gmail.com",
  subject: "Due Task",
  text: "Hello, Please complete the task by EOD",
};
transporter.sendMail(message, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});
