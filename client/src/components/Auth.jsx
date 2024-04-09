import { useState } from "react"
import axios from "axios";

const Auth = () => {
    const [loginPage, setLoginPage] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    /**
     * this method will make an api call to the login route
     */
    const loginUser = async () => {
        const response = await axios.post('auth/login', { email, password });
        console.log(response.data);
    }


    /**
     * this method will make an api call to the signup route
     */
    const signup = () => {
        const signupData = {
            name: name,
            email: email,
            password: password
        }
        console.log(signupData);
    }

    return (
        <div className="h-screen flex items-center justify-center">
            {/* for login this form will work */}
            {loginPage && (
                <div className="flex flex-col">
                    <p>login</p>
                    <input
                        className="outline-none border border-black my-1 p-1"
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <input
                        className="outline-none border border-black my-1 p-1"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white py-1 px-2" onClick={loginUser}>Signin</button>
                    <p>Don't have an account?<span onClick={() => setLoginPage(false)}>signup</span></p>
                </div>
            )}
            {/* for signup this form will work */}
            {!loginPage && (
                <div className="flex flex-col">
                    <p>signup</p>
                    <input
                        className="outline-none border border-black my-1 p-1"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="outline-none border border-black my-1 p-1"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="outline-none border border-black my-1 p-1"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white py-1 px-2" onClick={signup}>Register</button>
                    <p>Already have an account?<span onClick={() => setLoginPage(true)}>Login</span></p>
                </div>
            )}
        </div>
    );
}

export default Auth;