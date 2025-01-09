// register code here
import React from 'react'
import axios from "axios"


const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    async function handleRegister() {
      try {
        const resposne = await axios.post('http://localhost:3000/users/signup',{username, password});

        const {token , message} = resposne.data;
        setMessage(message)

        localStorage.setItem('token',token );
      } catch (error) {
        setError(error.resposne?.data?.message || 'something went wrong!');
      }
    }
    return (
        <div>
            {message && <div>{message}</div>}
            {error && <div>{error} </div>}
            <div>
                <form  onSubmit={handleRegister}>
                    <div>
                        <label htmlFor=""> Username:</label>
                        <input type="text"
                            name='username'
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                         />
                    </div>
                    <div>
                        <label htmlFor="">Password:</label>
                        <input type="text" 
                         name='password'
                         value={password}
                         onChange={(e)=>setPassword(e.target.value)}
                         />
                    </div>
                    <button type='submit'>Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Register