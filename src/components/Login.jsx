import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ username, setUsername, password, setPassword, user, setUser, loggedIn, setLoggedIn, handleLogout }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setLoggedIn(true)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column'}}>
        <div className="username">
            <label>Username: </label>
            <input type='text' placeholder='input your username' onChange={(e) => setUsername(e.target.value)} />
        </div>

        <br />

        <div className="password">
            <label>Password: &nbsp;</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} />
        </div>

        <br />

        <button type='submit' style={{ width: '32%'}}>Login</button>
    </form>
  )
}

export default Login