import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Prompt from "../components/Prompt";
import Registration from "./Registration";
import "./Login.css";

interface Options {
    isAdmin?: boolean;
}

const Login = (props: Options) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const role = props.isAdmin ? 'admin' : 'student';
            
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role })
            });

            if (response.ok) {
                const success = await login(username, password, role);
                if (success) {
                    navigate('/dashboard');
                }
            } else {
                // Generic error message - don't reveal if username exists or not
                alert('Invalid credentials. Please check your username and password.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your connection and try again.');
        }

        setIsLoading(false);
    };

    if (showRegistration) {
        return <Registration 
            isAdmin={props.isAdmin} 
            onBackToLogin={() => setShowRegistration(false)}
        />;
    }

    return (
        <>
            <main className="login">
                <h1>{props.isAdmin ? "Admin" : "Student"} Login</h1>
                <br />
                
                <div className="demo-credentials">
                    <p>Demo credentials:</p>
                    {props.isAdmin ? (
                        <p><strong>Admin:</strong> HOD / iLOVEjava@420 or admin / admin123</p>
                    ) : (
                        <p><strong>Student:</strong> john / password or student / student123</p>
                    )}
                </div>
                
                <form onSubmit={handleSubmit}>
                    <Prompt
                        type="text"
                        arg="Username"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <br />
                    
                    <Prompt
                        type="password"
                        arg="Password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <br />
                    
                    <a href="#">Forgot password?</a>
                    <br />
                    
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    
                    <br />
                    
                    <button 
                        type="button" 
                        onClick={() => setShowRegistration(true)}
                        className="register-btn"
                    >
                        Register
                    </button>
                </form>
            </main>
        </>
    )
}

export default Login;