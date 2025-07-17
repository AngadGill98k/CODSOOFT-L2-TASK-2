import React, { useEffect, useState } from 'react';
import './take.css';
import { useNavigate } from 'react-router-dom';

let Take = () => {
  let [quiz, setQuiz] = useState([]);
  let [search, setSearch] = useState('');
  let navigate = useNavigate();
  let url = 'http://localhost:3001/';

  useEffect(() => {
    fetch(`${url}g_quiz`)
      .then(res => res.json())
      .then(data => setQuiz(data.quiz || []));
  }, []);

  let handleSearch = () => {
    let endpoint = search.trim()
      ? `${url}search_quiz?query=${encodeURIComponent(search)}`
      : `${url}g_quiz`;

    fetch(endpoint)
      .then(res => res.json())
      .then(data => setQuiz(data.quiz || []))
      .catch(err => {
        console.error("Error:", err);
        alert("Failed to fetch quizzes.");
      });
  };

  let handleClick = (id) => {
    navigate('/quiz', { state: { id } });
  };

  return (
    <div className="outer-wrapper">
      <div className="main-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a quiz..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="quiz-grid">
          {quiz.map((q) => (
            <div
              className="quiz-card"
              key={q._id}
              onClick={() => handleClick(q._id)}
            >
              {q.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Take;
