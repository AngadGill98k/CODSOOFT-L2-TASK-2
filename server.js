const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT=3001
const app = express();
app.use(cors());
app.use(express.json());
const Quiz=require('./model/quiz.js')
mongoose.connect('mongodb://127.0.0.1:27017/quiz')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.post('/c_quiz',async (req,res)=>{
    console.log("req send")
    let data=req.body
    let name=data.name
    let quiz_d=data.quest
    // let desc=data.desc
    console.log(name,quiz_d)
    let quiz=new Quiz({
        name:name,
        // des:desc,//in react file add desc
        questions:quiz_d
    })
    console.log('new',quiz)
    await quiz.save()
    res.send({msg:'ok',quiz})
})
app.get('/search_quiz', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.json({ msg: "Empty query", quiz: [] });

  try {
    const result = await Quiz.find({
      name: { $regex: query, $options: 'i' } // case-insensitive partial match
    });

    res.json({ msg: "Found", quiz: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Search failed", quiz: [] });
  }
});

app.get('/g_quiz',async(req,res)=>{
let quiz=await Quiz.find().limit(20)
console.log(quiz)
res.json({msg:'ret ok',quiz}) 
})
app.post('/quiz',async (req,res)=>{
    let data=req.body
    let quiz = await Quiz.findById(data.id);
    console.log('quiz founded',quiz)
    res.json({msg:"founded",quiz})
})
app.listen(PORT, () => console.log('Server running on port 5000'));  