import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import "./sum.css"
let Summmary = () => {
  let location = useLocation();
  let { total, marks, summary } = location.state || {};
  let navigate=useNavigate()

let score={
    total,
    marks
}
function handleclick(){
navigate('/')
}
  return (
    <>
    <div className="summary-container">
  <h1>
    Marks Obtained: <span>{score.marks}/{score.total}</span>
  </h1>
  <ul>
    {summary.map((value, index) => (
      <li key={index}>
        <h2>Question: {value.question}</h2>
        <p className="correct-answer">Correct Answer: {value.correctAnswer}</p>
        <p className="selected-answer">Your Answer: {value.selectedAnswer}</p>
      </li>
    ))}
  </ul>
  <button onClick={handleclick}>Go to Home</button>
</div>

    </>
  )
}

export default Summmary