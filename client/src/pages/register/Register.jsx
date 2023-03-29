import { RemoveRedEye } from '@mui/icons-material'
import axios from 'axios';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "./register.css"

function Register() {
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const history = useNavigate();
    const clickHandler = async(e) =>{
      e.preventDefault()
      if(passwordAgain.current.value !== password.current.value){
        password.current.setCustomValidity("Password don't match!");
      }else{
        const user = {
          username:username.current.value,
          email:email.current.value,
          password:password.current.value,
        }
        try{
          await axios.post("http://localhost:8800/api/auth/register", user)
          history("/login");
        }catch(err){
          console.log(err)
        }
        
      }
    }

    const [show, setShow] = useState("password");
    const [isShow, setisShow] = useState(false)
    const showEvent = () =>{
        setShow(isShow?"password":"text")
        setisShow(!isShow)
    }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">LamaSocial</h3>
            <span className="loginDesc">Connect With Your Friends And Create Your World on LamaSocial</span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={clickHandler}>
                <input placeholder='Username' ref={username} required minLength={6} className="loginInput" />
                <input placeholder='Email' type="email" ref={email} required className="loginInput" />
                <div className="loginPassword">
                    <input placeholder='Password' ref={password} required minLength={3} maxLength={16} type={show} className="loginInput" />
                    <RemoveRedEye className='passwordIcon' onClick={showEvent} />
                </div>
                <div className="loginPassword">
                    <input placeholder='Confirm Password'required minLength={6} maxLength={16} ref={passwordAgain} type={show} className="loginInput" />
                    <RemoveRedEye className='passwordIcon' onClick={showEvent} />
                </div>
                
                <button className="loginButton" type='submit'>Sign Up</button>
                <button className="loginRegisterButton">Log into Account</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register
