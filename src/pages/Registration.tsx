import { useState } from "react";
import Prompt from "../components/Prompt";
import "./Registration.css";

interface Options {
    isAdmin?: boolean;
    onBackToLogin?: () => void;
}

const Registration = (props: Options) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateUsername = async (value: string) => {
        if (!value) {
            setUsernameError('');
            return;
        }

        try {
            // Check username availability by attempting to get user info
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: value, 
                    password: 'dummy', 
                    role: props.isAdmin ? 'admin' : 'student' 
                })
            });

            if (response.status === 401) {
                // Username exists but wrong password - means username is taken
                setUsernameError('error');
            } else {
                // Username doesn't exist - available for registration
                setUsernameError('acceptable');
            }
        } catch (error) {
            // Network error or server down - assume username is available
            setUsernameError('acceptable');
        }
    };

    const validatePassword = (value: string) => {
        if (!value) {
            setPasswordError('');
            return;
        }

        // Password strength validation
        const hasMinLength = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        const strengthScore = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;

        if (strengthScore < 2) {
            setPasswordError('error');
        } else if (strengthScore < 4) {
            setPasswordError('warn');
        } else {
            setPasswordError('acceptable');
        }
    };

    const validateConfirmPassword = (value: string) => {
        if (!value) {
            setConfirmPasswordError('');
            return;
        }

        if (value === password) {
            setConfirmPasswordError('acceptable');
        } else {
            setConfirmPasswordError('error');
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        
        // Debounce username validation to avoid too many API calls
        setTimeout(() => validateUsername(value), 500);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
        
        // Also revalidate confirm password if it exists
        if (confirmPassword) {
            validateConfirmPassword(confirmPassword);
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        validateConfirmPassword(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            setConfirmPasswordError('error');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    role: props.isAdmin ? 'admin' : 'student'
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Registration successful! You can now log in with username: ${username}`);
                
                // Clear form and go back to login
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setUsernameError('');
                setPasswordError('');
                setConfirmPasswordError('');
                
                if (props.onBackToLogin) {
                    props.onBackToLogin();
                }
            } else {
                if (response.status === 409) {
                    setUsernameError('error');
                    alert('Username already exists. Please choose a different username.');
                } else {
                    alert(`Registration failed: ${data.error}`);
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please check your connection and try again.');
        }

        setIsLoading(false);
    };

    const getUsernameClassName = () => {
        if (!usernameError) return '';
        if (usernameError === 'acceptable') return 'acceptable';
        return 'error';
    };

    const getPasswordClassName = () => {
        if (!passwordError) return '';
        if (passwordError === 'acceptable') return 'acceptable';
        if (passwordError === 'warn') return 'warn';
        return 'error';
    };

    const getConfirmPasswordClassName = () => {
        if (!confirmPasswordError) return '';
        if (confirmPasswordError === 'acceptable') return 'acceptable';
        return 'error';
    };

    return (
        <>
            <main className="registration">
                <h1>{props.isAdmin ? "Admin" : "Student"} Registration</h1>
                <br />
                
                <form onSubmit={handleSubmit}>
                    <Prompt
                        type="text"
                        arg="Username"
                        placeholder="Choose a username"
                        value={username}
                        onChange={handleUsernameChange}
                        className={getUsernameClassName()}
                    />
                    {usernameError === 'error' && (
                        <div className="error-message">Username already exists</div>
                    )}
                    {usernameError === 'acceptable' && (
                        <div className="success-message">Username available</div>
                    )}
                    <br />
                    
                    <Prompt
                        type="password"
                        arg="Password"
                        placeholder="Create a password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={getPasswordClassName()}
                    />
                    {passwordError === 'warn' && (
                        <div className="warning-message">Password could be stronger (try adding uppercase, numbers, or special characters)</div>
                    )}
                    {passwordError === 'acceptable' && (
                        <div className="success-message">Strong password</div>
                    )}
                    {passwordError === 'error' && (
                        <div className="error-message">Password too weak (minimum 8 characters)</div>
                    )}
                    <br />
                    
                    <Prompt
                        type="password"
                        arg="Confirm Password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={getConfirmPasswordClassName()}
                    />
                    {confirmPasswordError === 'error' && (
                        <div className="error-message">Passwords don't match</div>
                    )}
                    {confirmPasswordError === 'acceptable' && (
                        <div className="success-message">Passwords match</div>
                    )}
                    <br />
                    
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>
                    
                    <br />
                    
                    <button 
                        type="button" 
                        onClick={props.onBackToLogin}
                        className="back-to-login-btn"
                    >
                        Back to Login
                    </button>
                </form>
            </main>
        </>
    );
};

export default Registration;