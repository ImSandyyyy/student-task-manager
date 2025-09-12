import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Prompt from "../components/Prompt";
import "./Login.css";

interface Options {
    isAdmin?: boolean;
}

const Login = (props: Options) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const mockUsers = {
        admin: { password: 'admin123', role: 'admin' },
        student: { password: 'student123', role: 'student' },
        HOD: { password: 'iLOVEjava@420', role: 'admin' },
        john: { password: 'password', role: 'student' }
    };

    const validateUsername = (value: string) => {
        if (!value) {
            setUsernameError('');
            return;
        }

        if (props.isAdmin) {
            const adminUsers = Object.entries(mockUsers).filter(([_, user]) => user.role === 'admin');
            const validAdminUsernames = adminUsers.map(([username]) => username);

            if (!validAdminUsernames.includes(value)) {
                setUsernameError('doesntExist');
            } else {
                setUsernameError('acceptable');
            }
        } else {
            const studentUsers = Object.entries(mockUsers).filter(([_, user]) => user.role === 'student');
            const validStudentUsernames = studentUsers.map(([username]) => username);

            if (!validStudentUsernames.includes(value)) {
                setUsernameError('doesntExist');
            } else {
                setUsernameError('acceptable');
            }
        }
    };

    const validatePassword = (value: string) => {
        if (!value) {
            setPasswordError('');
            return;
        }

        if (username && mockUsers[username as keyof typeof mockUsers]) {
            const correctPassword = mockUsers[username as keyof typeof mockUsers].password;
            if (value === correctPassword) {
                setPasswordError('acceptable');
            } else if (value.length < correctPassword.length) {
                setPasswordError('warn');
            } else {
                setPasswordError('error');
            }
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        validateUsername(value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const role = props.isAdmin ? 'admin' : 'student';

        const user = mockUsers[username as keyof typeof mockUsers];
        if (user && user.password === password && user.role === role) {
            const success = await login(username, password, role);
            if (success) {
                navigate('/dashboard');
            }
        } else {
            if (!user) {
                setUsernameError('doesntExist');
            } else if (user.role !== role) {
                setUsernameError('error');
            } else {
                setPasswordError('error');
            }
        }

        setIsLoading(false);
    };

    const getUsernameClassName = () => {
        if (!usernameError) return '';
        if (usernameError === 'acceptable') return 'acceptable';
        if (usernameError === 'doesntExist') return 'error doesntExist';
        return 'error';
    };

    const getPasswordClassName = () => {
        if (!passwordError) return '';
        if (passwordError === 'acceptable') return 'acceptable';
        if (passwordError === 'warn') return 'warn';
        return 'error';
    };

    return (
        <>
            <main className="login">
                <h1>{props.isAdmin ? "Admin" : "Student"} Login</h1>
                <br /><br />
                <div style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
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
                        placeholder="e.g: HOD"
                        value={username}
                        onChange={handleUsernameChange}
                        className={getUsernameClassName()}
                    />
                    <br />
                    <Prompt
                        type="password"
                        arg="Password"
                        placeholder="e.g: iLOVEjava@420"
                        value={password}
                        onChange={handlePasswordChange}
                        className={getPasswordClassName()}
                    />
                    <br />
                    <a href="#">Forgot password?</a>
                    <br />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </main>
        </>
    )
}

export default Login;