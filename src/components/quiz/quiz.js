import React, { useEffect, useState } from 'react'
import "./quiz.css"
import { useLocation, useNavigate } from 'react-router-dom';
const Quiz = () => {
  let [count, setc] = useState(0)
  let location = useLocation()
  let navigate=useNavigate()
  let url = 'http://localhost:3001/'
  console.log('count is', count)
  let [quiz, s_quiz] = useState([]);
  useEffect(() => {

    let { id } = location.state || {};
    console.log('id is', id)
    fetch(`${url}quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.msg)
        console.log(data.quiz)
        s_quiz([data.quiz])
      })
  }, [])


  

  
 function handleclick(s_opt) {
  s_quiz(prevQuiz => {
    const updatedQuestions = prevQuiz[0].questions.map((q, idx) => {
      if (idx !== count) return q;

      // Log the selected option before returning
      console.log(`Option ${s_opt} selected for question ${count + 1}`);

      const updatedQuestion = {
        ...q,
        op1: { ...q.op1, status: s_opt === "op1" },
        op2: { ...q.op2, status: s_opt === "op2" },
        op3: { ...q.op3, status: s_opt === "op3" },
        op4: { ...q.op4, status: s_opt === "op4" }
      };

      // Log the full updated status of the current question
      console.log("Updated statuses:", {
        op1: updatedQuestion.op1.status,
        op2: updatedQuestion.op2.status,
        op3: updatedQuestion.op3.status,
        op4: updatedQuestion.op4.status
      });

      return updatedQuestion;
    });

    return [{ ...prevQuiz[0], questions: updatedQuestions }];
  });
}

  

  function next() {
    if (count < quiz[0].questions.length - 1) {
      setc(count + 1);
    }
  }

  function back() {
    if (count == 0) {

    } else {
      setc(count - 1)
    }
  }
  function submit() {
    let total = quiz[0].questions.length;
    let marks = 0
    let score = {
      total,
      marks
    };

    quiz[0].questions.forEach((q) => {
      if (q[q.correct]?.status === true) {
        marks = marks + 1;
      }
    });
    score.marks = marks;
    let summary = quiz[0].questions.map((q) => {
      let selectedKey = ["op1", "op2", "op3", "op4"].find(key => q[key].status === true);
      return {
        question: q.question,
        correctAnswer: q[q.correct].opt,
        selectedAnswer: selectedKey ? q[selectedKey].opt : "Not Answered"
      };
    });

    console.log("Summary:", summary)

    console.log("total marks is", total, "marks scored is ", score)
     navigate('/summary', {
  state: {
    total,
    marks,
    summary
  },
  replace: true  // ⬅️ This prevents going back using browser back
});
}
  return (
  <>
    {(!quiz[0] || !quiz[0].questions) ? (
      <div>Loading quiz...</div>
    ) : (
      <>
        <div className='container'>
      
          <div className='wrap'>
            <div id='question'>{quiz[0].questions[count].question}</div>
            <div id='options'>
  {["op1", "op2", "op3", "op4"].map(optKey => {
    const opt = quiz[0].questions[count][optKey];
    const isSelected = opt.status;
    return (
      <button
        key={optKey}
        onClick={() => handleclick(optKey)}
        className={isSelected ? "selected" : ""}
      >
        {opt.opt}
      </button>
    );
  })}
</div>

          </div>
          <div id="nav-buttons">
  <button onClick={back} id="back">Back</button>
  <button onClick={submit} className="submit-btn">Submit</button>
  <button onClick={next} id="next">Next</button>
</div>

        </div>
        
      </>
    )}
  </>
);
}

export default Quiz
