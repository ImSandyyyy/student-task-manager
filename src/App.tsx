import "./App.css";
import Home from "./pages/Home";
import { useNavigate, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import Button from "./components/Button";
import ThemeControls from "./components/ThemeControls";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
    const redirect = useNavigate();
    const { user, logout } = useAuth();
    const [isThemeControlsOpen, setIsThemeControlsOpen] = useState(false);

    const toggleThemeControls = () => {
        setIsThemeControlsOpen(!isThemeControlsOpen);
    };

    const handleLogout = () => {
        logout();
        redirect('/');
    };

    return (
        <>
            <header>
                <Button icon="menu_open" />
                <a href="/">Student Task Manager</a>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {user && (
                        <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                            {user.role === 'admin' ? 'Admin' : 'Student'}: {user.username}
                        </span>
                    )}
                    <Button icon="palette" onClick={toggleThemeControls} />
                    {user && (
                        <Button icon="logout" onClick={handleLogout} />
                    )}
                </div>
            </header>

            <div className="wrapper">
                <nav>
                    <section>
                        <div>
                            <p>Login</p>
                            <span className="material-symbols-outlined">account_circle</span>
                        </div>
                        <ul>
                            <li>
                                <Button icon="school" onClick={() => redirect('/login/student')}>
                                    <p>Student</p>
                                </Button>
                            </li>
                            <li>
                                <Button icon="manage_accounts" onClick={() => redirect('/login/admin')}>
                                    <p>Admin</p>
                                </Button>
                            </li>
                        </ul>
                        <li>
                            <Button icon="assignment" onClick={() => redirect('/dashboard')}>
                                <p>Dashboard</p>
                            </Button>
                        </li>
                    </section>

                    <section>
                        <div>
                            <p>Website</p>
                            <span className="material-symbols-outlined">language</span>
                        </div>
                        <ul>
                            <li>
                                <Button icon="info" onClick={() => redirect('/about')}>
                                    <p>About</p>
                                </Button>
                            </li>
                        </ul>
                    </section>
                </nav>

                <Routes>
                    <Route path='/' element={
                        <ProtectedRoute requireAuth={false}>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/login">
                        <Route path="student" element={
                            <ProtectedRoute requireAuth={false}>
                                <Login />
                            </ProtectedRoute>
                        } />
                        <Route path="admin" element={
                            <ProtectedRoute requireAuth={false}>
                                <Login isAdmin />
                            </ProtectedRoute>
                        } />
                    </Route>
                    <Route path="about" element={<AboutUs />} />
                    <Route path="dashboard" element={
                        <ProtectedRoute requireAuth={true}>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    {/* Fallback route for undefined paths */}
                    <Route path="*" element={
                        <ProtectedRoute requireAuth={false}>
                            <Home />
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>

            <ThemeControls
                isOpen={isThemeControlsOpen}
                onClose={() => setIsThemeControlsOpen(false)}
            />
        </>
    );
};

export default App;
