const express = require('express');
const mongoose = require('mongoose');
// const qaDB = require('./non_sql_database/mongoose_database.jsx');

const app = express();

const port = 3000;
mongoose.connect('mongodb://localhost/qaDB');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('Hello Word!');
  // qaDB.find({});
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
