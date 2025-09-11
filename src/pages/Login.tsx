import Prompt from "../components/Prompt";
import "./Login.css";

interface Options {
    isAdmin?: boolean;
}

const Login = (props: Options) => {
    return (
        <>
            <main className="login">
                <h1>{props.isAdmin ? "Admin" : "Student"} Login</h1>
                <br /><br />
                <form>
                    <Prompt className="error acceptable" type="text" arg="Username" placeholder="e.g: HOD" />
                    <br />
                    <Prompt className="acceptable" type="password" arg="Password" placeholder="e.g: iLOVEjava@420" />
                    <br />
                    <a href="#">Forgot password?</a>
                    <br />                    
                    <button type="submit">Login</button>
                </form>
            </main>
        </>
    )
}

export default Login;