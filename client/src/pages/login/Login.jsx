import { Visibility, VisibilityOff } from '@mui/icons-material'
import React, { useRef, useState } from 'react'
import "./login.css"
import {loginCalls} from "../../apiCalls"
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';

function Login() {
  const [show, setShow] = useState("password");
  const [isShow, setisShow] = useState(false)
  const showEvent = () =>{
      setShow(isShow?"password":"text")
      setisShow(!isShow)
  }
  const email = useRef();
  const password = useRef();
  const {user, error, isFetching, dispatch} = useContext(AuthContext);
  const clickHandler = (e) =>{
    e.preventDefault();
    loginCalls({email:email.current.value, password:password.current.value}, dispatch);
  }
  console.log(user);
  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">LamaSocial</h3>
            <span className="loginDesc">Connect With Your Friends And Create Your World on LamaSocial</span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={clickHandler}>
                <input placeholder='Email' type="email" className="loginInput" required={true} ref={email} />
                <div className="loginPassword">
                    <input placeholder='Password' type={show} className="loginInput" required={true} minLength={6} ref={password} />
                    {isShow?<VisibilityOff className='passwordIcon' onClick={showEvent} />:<Visibility className='passwordIcon' onClick={showEvent} />}
                </div>
                
                <button className="loginButton" type='submit' disabled={isFetching}>{isFetching?<CircularProgress color="inherit" size="30px" />:"Login"}</button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton" disabled={isFetching}>{isFetching?<CircularProgress color="inherit" size="30px" />:"Create A New Account"}</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
