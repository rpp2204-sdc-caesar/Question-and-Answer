const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  photo_id: { type: Number },
  photo_url: { type: String },
});

const answerSchema = new mongoose.Schema({
  answer_id: { type: Number, require: true },
  answer_body: { type: String, require: true },
  answer_date: { type: Date, require: true },
  answerer_name: { type: String, require: true },
  answer_helpfulness: { type: Number, require: true },
  answer_reported: { type: Boolean, require: true },
  photos: [photoSchema],
});

const questionSchema = new mongoose.Schema({
  question_id: { type: Number, require: true },
  question_body: { type: String, require: true },
  question_date: { type: Date, require: true },
  asker_name: { type: String, require: true },
  question_helpfulness: { type: Number, require: true },
  question_reported: { type: Boolean, require: true },
  answers: [answerSchema],
});

const productQuestionAnswerSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  questions: [questionSchema],
});

const QADB = mongoose.model('QADB', productQuestionAnswerSchema);

module.exports = QADB;
