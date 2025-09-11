import Overview from "../components/Overview";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
    return (
        <>
            <main className="aboutUs">
                <TaskCard />
               
            </main>
            <Overview pageName="dashboard" />

        </>
    )
}

export default Dashboard;