import React from 'react';
import './css.css';
import { useNavigate } from 'react-router-dom';

let Home = () => {
  let navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="header">
        <h1>Quizzy</h1>
        <p>Your Interactive Quiz Companion</p>
      </div>
      <div className="quiz-buttons">
        <button onClick={() => navigate('/create')} id="c_quiz">Create Quiz</button>
        <button onClick={() => navigate('/take')} id="t_quiz">Take Quiz</button>
      </div>
    </div>
  );
};

export default Home;
