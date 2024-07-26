import React, { useState } from 'react';
import authService from './services/authService';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginImage from './static/img/images.png';  // Default login image
import forgotPasswordImage from './static/img/forgot_password.png';  // Image for forgot password view

function Login() {
    const [empId, setEmpId] = useState('');
    const [password, setPassword] = useState('');
    const [view, setView] = useState('login');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(empId, password);
            navigate('/home', { state: { empId } });
        } catch (error) {
            alert("Error logging in");
        }
    };

    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        setView('forgotPassword');
    };

    const handleBackToLogin = () => {
        setView('login');
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Logic to handle password reset
        alert('Password reset successful');
        setView('login');
    };

    return (
        <div className="App">
            <center>
                <table className="layout">
                    <tbody>
                        <tr>
                            {view === 'login' ? (
                                <>
                                    <td className="imageColumn">
                                        <div><img src={loginImage} alt="Login" /></div>
                                    </td>
                                    <td className="formColumn">
                                        <div id="a">
                                            <h2 id="a1">Login</h2>
                                            <form onSubmit={handleLogin}>
                                                <div>
                                                    <label>Employee ID:</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Employee ID"
                                                        value={empId}
                                                        onChange={(e) => setEmpId(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label>Password:</label>
                                                    <input
                                                        type="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                </div><br />
                                                <a href="#" onClick={handleForgotPasswordClick}>Forgot Password?</a><br /><br />
                                                <button type="submit" className="large-button">Login</button>
                                            </form>
                                        </div>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="formColumn">
                                        <h2>Forgot Password</h2>
                                        <div className="forma">
                                            <form onSubmit={handleResetPassword}>
                                                <div>
                                                    <label>Email:</label>
                                                    <input type="email" required />
                                                </div>
                                                <div>
                                                    <label>New Password:</label>
                                                    <input type="password" required />
                                                </div>
                                                <div>
                                                    <label>Confirm Password:</label>
                                                    <input type="password" required />
                                                </div><br />
                                                <button type="submit">Reset Password</button><br />
                                                <button type="button" onClick={handleBackToLogin}>Back to Login</button>
                                            </form>
                                        </div>
                                    </td>
                                    <td className="imageColumn">
                                        <div><img src={forgotPasswordImage} alt="Forgot Password" /></div>
                                    </td>
                                </>
                            )}
                        </tr>
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Login;
