import React from 'react'
import './css.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let  navigate=useNavigate()
  let handlecreate=()=>{
    navigate('/create')
  }
  let handletake=()=>{
    navigate('/take')
  }
  return (
    <>
    <div id='quiz'>
      <button onClick={handlecreate} id='c_quiz'>create quiz</button>
      <button onClick={handletake} id='t_quiz'>take quiz</button>
    </div>
    </>
  )
}

export default Home