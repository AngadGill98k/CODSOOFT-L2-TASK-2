import React from 'react'
import { data } from 'react-router-dom'

let Login = () => {
    let handlesubmit=()=>{
        let mail=document.querySelector('#mail')
        mail=mail.innerText
        let pass=document.querySelector('#pass')
        pass=pass.innerText
        let username=document.querySelector('#username')
        username=username.innerText
        console.log(mail,pass)
        fetch(``,{
            method:'POST',
            headers:{},
            body:JSON.stringify({mail,pass,username})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.msg)
        })
    }
return (
<>
<input type='text' id='username'></input>
<input type='text' id='mail'></input>
<input type='pass' id='pass'></input>
<button onClick={handlesubmit}>submit</button>  
</>
)
}

export default Login