const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  answer_id: { type: Number },
  photo_url: { type: String },
});

// const AnswerPhoto = mongoose.model('AnswerPhoto', photoSchema);

// const answerSchema = new mongoose.Schema({
//   answer_id: {
//     id: { type: Number, require: true },
//     body: { type: String, require: true },
//     date: { type: Date, require: true },
//     answerer_name: { type: String, require: true },
//     answerer_email: { type: String, require: true },
//     helpfulness: { type: Number, require: true },
//     photos: [photoSchema],
//   },
//   // default: {},
// });

// const Answer = mongoose.model('Answer', answerSchema);

const questionSchema = new mongoose.Schema({
  question_id: { type: Number, require: true },
  question_body: { type: String, require: true },
  question_date: { type: Date, require: true },
  asker_name: { type: String, require: true },
  question_helpfulness: { type: Number, require: true },
  reported: { type: Boolean, require: true },
  asker_email: { type: String, require: true },
  answers: {
    answer_id: {
      id: { type: Number, require: true },
      body: { type: String, require: true },
      date: { type: Date, require: true },
      answerer_name: { type: String, require: true },
      answerer_email: { type: String, require: true },
      helpfulness: { type: Number, require: true },
      photos: [photoSchema],
    },
    default: { type: Object },
  },
});

// const Question = mongoose.model('Question', questionSchema);

const productQuestionAnswerSchema = new mongoose.Schema({
  product_id: { type: String, require: true },
  results: [questionSchema],
});

const Qaproduct = mongoose.model('Qaproduct', productQuestionAnswerSchema);

module.exports = Qaproduct;
