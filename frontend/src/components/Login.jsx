import React from 'react'
import useLogin from '../hooks/useLogin'
import {useState} from 'react'

const Login = () => {
  const { login } = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await login(username, password)
    if(res && res.token){  
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))

    } else {
      console.error("Login failed:", res.error);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login