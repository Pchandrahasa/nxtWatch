import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess=(jwtToken)=>{
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })


  }

  const onSubmitFailure=()=>[

  ]

  const onSubmit = async event => {
    event.preventDefault()

    const userDetails = {username: username, password: password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      console.log(data) 
      if (response.ok === true) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg)
      }
     
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form className="login" onSubmit={onSubmit}>
      <div className="login-main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="Logo"
          className="login-logo"
        />
        <div className="login-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            onChange={onChangeUsername}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChangePassword}
          />
          <Link to="/header">
            <button type="submit" className="login-button">
              Login
            </button>
          </Link>
         
        </div>
      </div>
    </form>
  )
}

export default Login
