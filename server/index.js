const express = require('express');
const mongoose = require('mongoose');
const qaDB = require('./non_sql_database/mongoose_database');

const app = express();

const port = 4000;
mongoose.connect('mongodb://localhost/qaDB');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.get('/qa/questions', (req, res) => {
  const pid = req.query.product_id;
  // console.log('product_id: ', req.query.product_id);
  qaDB.find({ product_id: pid })
    .then((response) => {
      // console.log('HERE ARE THE DATA FROM QAPRODUCTS:', response[0].results);
      res.send(response[0]);
    })
    .catch((err) => err);
});

app.post('/qa/questions', (req, res) => {
  res.send('Posted a question');
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  res.send('Posted an answer');
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  res.send('Question reported');
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  res.send('Question marked helpful');
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  res.send('Answers marked helpful');
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.send('Answer reported');
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
