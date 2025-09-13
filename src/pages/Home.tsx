import Overview from "../components/Overview";
import "./Home.css";

const Home = () => {
    return (
        <>
            <main className="scrollable">
                <h1>Student Task Manager</h1>
                <div className="home-content">
                    <p className="home-subtitle">
                        Make your academic journey easier with our all-inclusive task management system.
                    </p>
                    
                    <p className="home-description">
                        Designed specifically for students and educators, our platform offers a seamless way to 
                        create, track, and manage academic tasks with priority-based organization and real-time progress tracking.
                    </p>
                    
                    <div className="home-section">
                        <h3 className="home-section-title">Key Features:</h3>
                        <ul className="features-list">
                            <li className="feature-item">
                                <span className="material-symbols-outlined feature-icon">check_circle</span>
                                Priority-based task organization
                            </li>
                            <li className="feature-item">
                                <span className="material-symbols-outlined feature-icon">check_circle</span>
                                Real-time progress tracking
                            </li>
                            <li className="feature-item">
                                <span className="material-symbols-outlined feature-icon">check_circle</span>
                                Separate dashboards for students and admins
                            </li>
                            <li className="feature-item">
                                <span className="material-symbols-outlined feature-icon">check_circle</span>
                                Customizable themes and user-friendly interface
                            </li>
                        </ul>
                    </div>
                    
                    <div className="home-section">
                        <h3 className="home-section-title">How It Works:</h3>
                        <div className="how-it-works-grid">
                            <div className="role-section">
                                <h4>For Students</h4>
                                <p>
                                    Log in to view assigned tasks, track your progress, and mark assignments as complete. 
                                    Stay organized with priority levels and due dates.
                                </p>
                            </div>
                            <div className="role-section">
                                <h4>For Educators</h4>
                                <p>
                                    Create and manage tasks for your students. Monitor class progress, 
                                    set priorities, and track completion rates in real-time.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="home-section">
                        <h3 className="home-section-title">Why Choose Our Platform?</h3>
                        <div className="benefits-grid">
                            <div className="benefit-item">
                                <span className="material-symbols-outlined benefit-icon">speed</span>
                                <h4>Fast & Efficient</h4>
                                <p>Lightning-fast interface built with modern React technology</p>
                            </div>
                            <div className="benefit-item">
                                <span className="material-symbols-outlined benefit-icon">security</span>
                                <h4>Secure & Reliable</h4>
                                <p>Your data is safe with our robust security measures</p>
                            </div>
                            <div className="benefit-item">
                                <span className="material-symbols-outlined benefit-icon">palette</span>
                                <h4>Customizable</h4>
                                <p>Personalize your experience with themes and layouts</p>
                            </div>
                        </div>
                    </div>

                    <div className="home-section">
                        <h3 className="home-section-title">Getting Started</h3>
                        <div className="steps-container">
                            <div className="step-item">
                                <div className="step-number">1</div>
                                <p className="step-text">Choose your role - Student or Admin - and log in with your credentials</p>
                            </div>
                            <div className="step-item">
                                <div className="step-number">2</div>
                                <p className="step-text">Access your personalized dashboard with all your tasks and progress</p>
                            </div>
                            <div className="step-item">
                                <div className="step-number">3</div>
                                <p className="step-text">Start managing tasks, tracking progress, and boosting productivity</p>
                            </div>
                        </div>
                    </div>

                    <div className="cta-section">
                        <h3 className="cta-title">Ready to Transform Your Academic Experience?</h3>
                        <p className="cta-text">
                            Join thousands of students and educators who are already using our platform to achieve their academic goals.
                        </p>
                        <div className="cta-buttons">
                            <a href="/login/student" className="cta-button-primary">
                                Student Login
                            </a>
                            <a href="/login/admin" className="cta-button-primary">
                                Admin Login
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <p className="footer-text">
                            Built with ❤️ by Euphoria GenX Group | Powered by React & TypeScript
                        </p>
                    </div>
                </div>
            </main>
            <Overview pageName="Home" summaries={[
                { Name: "Student Login", Link: "/login/student", IsAnId: false },
                { Name: "Admin Login", Link: "/login/admin", IsAnId: false },
                { Name: "About Us", Link: "/about", IsAnId: false }
            ]} />
        </>
    )
}

export default Home;