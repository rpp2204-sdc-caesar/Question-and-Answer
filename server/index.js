require('dotenv').config();
const IP = process.env.IP_ADDRESS;
const express = require('express');
const mongoose = require('mongoose');
const qaDB = require('./non_sql_database/mongoose_database');

const app = express();
app.use(express.json());

const port = 4000;
mongoose.connect(`mongodb://${IP}/qaDB`);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.get('/loaderio-45ab08560e1586cff8f556504c9cb2c0', (req, res) => {
  res.send('loaderio-45ab08560e1586cff8f556504c9cb2c0');
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
  // console.log('post question from fec', req.body);
  const questionBody = req.body.body;
  const askerName = req.body.name;
  const askerEmail = req.body.email;
  const pid = req.body.product_id;
  qaDB.updateOne(
    { "product_id": pid },
    {
      $push:
      {
        results: {
          'question_id': Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
          'question_body': questionBody,
          'asker_name': askerName,
          'question_helpfulness': 0,
          'reported': false,
          'asker_email': askerEmail,
          'question_date': new Date(),
        },
      },
    },
  )
    .then(() => {
      res.send('Created');
    })
    .catch((err) => err);
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  const qaID = req.params.question_id;
  // console.log('post answer from fec', req.body);
  const answerBody = req.body.body;
  const answerName = req.body.name;
  const answerEmail = req.body.email;
  const answerPhoto = req.body.photos;
  const answerID = Math.floor(Math.random() * Date.now());
  qaDB.updateOne(
    { 'results.question_id': qaID },
    {
      [`results.$.answers.${answerID}`]: {
        'id': answerID,
        'body': answerBody,
        'date': new Date(),
        'answerer_name': answerName,
        'helpfulness': 0,
        'answerer_email': answerEmail,
        'photos': answerPhoto
      },
    },
  )
    .then(() => {
      // console.log('SUCCESSFULLY UPLOAD ANSWER', response);
      res.send('Created');
    })
    .catch((err) => err);
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  const qaID = req.params.question_id;
  qaDB.updateOne(
    // { 'product_id': pid },
    { 'results.question_id': qaID },
    {
      $pull: { 'results': { 'question_id': qaID } },
    },
  )
    .then(() => {
      res.send('Question reported');
    })
    .catch((err) => err);
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const qaID = req.params.question_id;
  qaDB.updateOne({ 'results.question_id': qaID }, { $inc: { 'results.$.question_helpfulness': 1 } })
    .then(() => {
      // console.log('here is the found data:', response);
      res.send('Question marked helpful');
    })
    .catch((err) => err);
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  console.log('Here is the answer_id:', req.params.answer_id);
  const answerID = req.params.answer_id;
  qaDB.updateOne({ [`results.answers.${answerID}`]: { $exists: true } }, { $inc: { [`results.$.answers.${answerID}.helpfulness`]: 1 } })
    .then(() => {
      // console.log('Here are the result for answer id:', response);
      res.send('Answers marked helpful');
    })
    .catch((err) => err);
});

// app.put('/qa/answers/:answer_id/report', (req, res) => {
//   res.send('Answer reported');
// });

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

module.exports = app;
