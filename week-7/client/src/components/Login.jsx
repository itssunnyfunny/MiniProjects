// login code here
import axios from 'axios';
import React from 'react'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    async function handleLogin() {
      try {
        const resposne = await axios.post('http://localhost:3000/user/signup',{username: username, password: password});
        const {token, message} = resposne.data;
         setMessage(message)
        localStorage.setItem('token', token);
      } catch (error) {
          setError(error.resposne?.data?.message || "something went wrong");
      }

    }
    return (
        <div>
            {error && <div> {error} </div>}
            {message && <div> {message} </div>}
            <div>
            <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          login
        </button>
      </form>
            </div>
        </div>
    )
}

export default Login