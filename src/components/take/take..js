import React, { useEffect, useState } from 'react'
import './take.css'
import { Navigate, useNavigate } from 'react-router-dom'
const Take = () => {
  let [quiz, setq] = useState([])
  let navigate=useNavigate()
  let url = 'http://localhost:3001/'
  useEffect(() => {
    fetch(`${url}g_quiz`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.msg)

        setq(data.quiz)

      })
  }, [])
  useEffect(() => {
    console.log(quiz)
  }, [quiz])

function handlesearch() {
  const searchInput = document.querySelector('#search');
  const query = searchInput.value.trim();

  const endpoint = query
    ? `${url}search_quiz?query=${encodeURIComponent(query)}`
    : `${url}g_quiz`; // fallback to full list

  fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(data => setq(data.quiz))
    .catch(err => {
      console.error("Error:", err);
      alert("Failed to fetch quizzes.");
    });
}

  let handleClick=(e)=>{
    let quiz=e.currentTarget
    let id=quiz.id
    console.log(id)
    navigate('/quiz',{ state: { id:id } })
  }
  
  return (
    <>
      <div id='s_area'>
        <input type='text' placeholder='search for quiz' id='search'></input>
        <button onClick={handlesearch}>search</button>
      </div>
      <div className='conatainer'>
        <ul>
          {quiz.map((value, index) => (
            <li onClick={handleClick} className='quiz' id={value._id} key={index}>
              <h1>{value.name}</h1>
              <p>{value.des}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Take