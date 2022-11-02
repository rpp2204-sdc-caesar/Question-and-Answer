const mongoose = require('mongoose');
// const customAlphabet = require('nanoid');

// const nanoid = customAlphabet(1234567890, 8);

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
  question_id: {
    type: Number, require: true, index: { unique: true },
  },
  question_body: { type: String, require: true },
  question_date: { type: Date, require: true },
  asker_name: { type: String, require: true },
  question_helpfulness: { type: Number, require: true, default: 0 },
  reported: { type: Boolean, require: true },
  asker_email: { type: String, require: true },
  answers: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
    id: {
      id: { type: Number, require: true },
      body: { type: String, require: true },
      date: { type: Date, require: true, default: new Date() },
      answerer_name: { type: String, require: true },
      answerer_email: { type: String, require: true },
      helpfulness: { type: Number, require: true, default: 0 },
      photos: [photoSchema],
    },
  },
}, { minimize: false });

// const Question = mongoose.model('Question', questionSchema);

const productQuestionAnswerSchema = new mongoose.Schema({
  product_id: { type: String, require: true },
  results: [questionSchema],
});

const Qaproduct = mongoose.model('Qaproduct', productQuestionAnswerSchema);

module.exports = Qaproduct;
