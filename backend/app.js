const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/role_auth');
mongoose.connection.on('connected', () => {
  console.log('Connected to database ');
});
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});


// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});