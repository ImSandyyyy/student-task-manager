import "./TaskCard.css";


const TaskCard = () => {
    return (
        <>
            <div className="task-card">
                <div className="task">
                    <h3>Solving 5 questions Leetcode</h3>
                    <p>due date: 12/09/25 </p>
                </div>
                <div className="task-actions">
                    <button>Edit <span className="material-symbols-outlined">edit</span></button>
                    <button> Delete <span className="material-symbols-outlined">delete</span></button>
                </div>
            </div>
        </>
    )
}


export default TaskCard