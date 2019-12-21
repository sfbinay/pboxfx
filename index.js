const express = require('express');
const connectDB = require('./config/db');
const app = express();
const connect = require('connect');
const cors = require('cors');

var bodyParser = require('body-parser');
//Connect DB
connectDB();

//Init Middleware
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: false })).use(express.json());
app.use(cors());
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API Running');
});

//Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/account', require('./routes/api/account'));
app.use('/api/announcement', require('./routes/api/announcement'));
app.use('/api/analyze', require('./routes/api/analyze'));
app.use('/api/pass', require('./routes/api/pass'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
