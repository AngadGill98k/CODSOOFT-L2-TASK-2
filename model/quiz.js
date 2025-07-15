const mongoose = require('mongoose');
const optschema=new mongoose.Schema({
opt:String,
status:Boolean
})

const questionSchema = new mongoose.Schema({
  question: String,
  op1:optschema,
  op2: optschema,
  op3: optschema,
  op4: optschema,
  correct: String, // e.g., 'op2'
});

const quizSchema = new mongoose.Schema({
  name: String,
  des:String,
  questions: [questionSchema],
});

module.exports = mongoose.model('Quiz', quizSchema);
