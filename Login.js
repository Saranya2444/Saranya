import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './services/authService';
import loginImage from './static/img/login.png';
import './Login.css';

function Login() {
    const [empId, setEmpId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(empId, password);
            navigate(`/employee/${empId}`);
        } catch (error) {
            alert('Error logging in');
        }
    };

    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        navigate('/forgot-password');
    };

    return (
        <div className="App">
            <center>
                <table className="layout">
                    <tbody>
                        <tr>
                            <td className="imageColumn">
                                <div><img src={loginImage} alt="Login" /></div>
                            </td>
                            <td className="formColumn">
                                <div id="a">
                                    <h2 id="a1">Login</h2>
                                    <form onSubmit={handleLogin}>
                                        <input type="text" placeholder="Employee ID" value={empId} onChange={(e) => setEmpId(e.target.value)} required />
                                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                                        <a href="#" onClick={handleForgotPasswordClick}>Forgot Password?</a><br /><br />
                                        <button type="submit">Login</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Login;
