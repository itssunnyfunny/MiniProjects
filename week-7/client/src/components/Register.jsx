// register code here
import React from 'react'
import axios from "axios"


const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    async function handleRegister() {
        const resposne = await axios.post(); // if you don't know about axios, give it a read https://axios-http.com/docs/intro
    }
    return (
        <div>
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