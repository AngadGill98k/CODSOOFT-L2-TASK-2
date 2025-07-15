import React, { useRef, useState } from 'react';
import './create.css';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const q_list = useRef(null);
    const [quest, setq] = useState([]);
    const navigate = useNavigate();
    const url = 'http://localhost:3001/';

    function add() {
        const question = document.querySelector('#ques');
        const o1 = document.querySelector('#opt1');
        const o2 = document.querySelector('#opt2');
        const o3 = document.querySelector('#opt3');
        const o4 = document.querySelector('#opt4');

        const ques = question.value.trim();
        const opt1 = o1.value.trim();
        const opt2 = o2.value.trim();
        const opt3 = o3.value.trim();
        const opt4 = o4.value.trim();

        if (!ques || !opt1 || !opt2 || !opt3 || !opt4) {
            alert("Please fill in all fields before adding the question.");
            return;
        }

        setq(prev => [
            ...prev,
            {
                question: ques,
                op1: { opt: opt1, status: false },
                op2: { opt: opt2, status: false },
                op3: { opt: opt3, status: false },
                op4: { opt: opt4, status: false },
                correct: null,
            }
        ]);

        // Clear input fields
        question.value = '';
        o1.value = '';
        o2.value = '';
        o3.value = '';
        o4.value = '';
    }

    function handleSelect(index, sel_opt) {
        setq(prev => {
            const updated = [...prev];
            updated[index].correct = sel_opt;
            return updated;
        });
    }

    function submit() {
        const q_name = document.querySelector('#quiz_name');
        const name = q_name.value.trim();

        if (!name) {
            alert("Quiz name cannot be empty.");
            return;
        }

        if (quest.length === 0) {
            alert("Please add at least one question.");
            return;
        }

        for (let i = 0; i < quest.length; i++) {
            if (!quest[i].correct) {
                alert(`Please select the correct option for question ${i + 1}`);
                return;
            }
        }

        fetch(`${url}c_quiz`, {
            method: 'POST',
            body: JSON.stringify({ name, quest }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("stored", data.msg);
            console.log(data.quiz);
            navigate('/');
        })
        .catch(err => {
            console.error("Error submitting quiz:", err);
            alert("Failed to submit quiz. Try again later.");
        });
    }

    return (
        <div id="create-container">
            <h2>Create a Quiz</h2>
            <input type='text' placeholder='Quiz name' id='quiz_name' />
            <div className="input-group">
                <input id='ques' type='text' className='question' placeholder='Write question' />
                <input id='opt1' type='text' className='option' placeholder='Option 1' />
                <input id='opt2' type='text' className='option' placeholder='Option 2' />
                <input id='opt3' type='text' className='option' placeholder='Option 3' />
                <input id='opt4' type='text' className='option' placeholder='Option 4' />
            </div>
            <button id='add' onClick={add}>Add Question</button>
            <ul ref={q_list}>
                {quest.map((value, index) => (
                    <li key={index}>
<div>
  {value.question} 
  <span className="hint">{" (Choose the correct answer)"}</span>
</div>

                        {['op1', 'op2', 'op3', 'op4'].map((optKey) => (
                            <label key={optKey}>
                                <input
                                    name={`q${index}`}
                                    type='radio'
                                    value={optKey}
                                    checked={value.correct === optKey}
                                    onChange={() => handleSelect(index, optKey)}
                                /> {value[optKey].opt}
                            </label>
                        ))}
                    </li>
                ))}
            </ul>
            <button onClick={submit}>Submit Quiz</button>
        </div>
    );
};

export default Create;
