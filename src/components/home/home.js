import React from 'react'
import './css.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate();

  let handlecreate = () => {
    navigate('/create');
  };

  let handletake = () => {
    navigate('/take');
  };

  return (
    <div className="quiz-wrapper">
      <div id="quiz">
        <h1 className="quiz-title">Quizzy</h1> {/* Add website title here */}
        <button onClick={handlecreate} id="c_quiz">Create Quiz</button>
        <button onClick={handletake} id="t_quiz">Take Quiz</button>
      </div>
    </div>
  );
};

export default Home;
