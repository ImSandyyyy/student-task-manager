import Prompt from "../components/Prompt";
import "./Login.css";

interface Options {
    isAdmin?: boolean;
}

const Login = (props: Options) => {
    return (
        <>
            <main>
                <h1>{props.isAdmin ? "Admin" : "Student"} Login</h1>
                <br />
                <form>
                    <Prompt type="text" arg="Username" placeholder="e.g: HOD"/>
                    <br />
                    <Prompt type="password" arg="Password" placeholder="e.g: iLOVEjava@420"/>
                    <br />
                    <button type="submit">Login</button>
                </form>
                <p>Invalid credentials</p>
            </main>
        </>
    )
}

export default Login;