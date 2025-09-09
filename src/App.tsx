import "./App.css";
import Home from "./pages/Home";
import { useNavigate, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login";

const App = () => {
  const redirect = useNavigate();

  return (
    <>
      <header>
        <button type="button">
          <span className="material-symbols-outlined">menu_open</span>
        </button>
        <a href="/">Student Task Manager</a>
        <button type="button">
          <span className="material-symbols-outlined">palette</span>
        </button>
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
                <button type="button" onClick={() => redirect('/login/student')}>
                  <span className="material-symbols-outlined">school</span>
                  <p>Student</p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => redirect('/login/admin')}>
                  <span className="material-symbols-outlined">
                    manage_accounts
                  </span>
                  <p>Admin</p>
                </button>
              </li>
            </ul>
          </section>

          <section>
            <div>
              <p>Website</p>
              <span className="material-symbols-outlined">language</span>
            </div>
            <ul>
              <li>
                <button type="button">
                  <span className="material-symbols-outlined">info</span>
                  <p>About</p>
                </button>
              </li>
            </ul>
          </section>
        </nav>
      
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login">
              <Route path="student" element={<Login />} />
              <Route path="admin" element={<Login isAdmin />} />
            </Route>
          </Routes>
      </div>
    </>
  );
};

export default App;
