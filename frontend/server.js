const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});
/*
app.post('/register', function(req, res){
    res.send(req.body);
});
*/
app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
