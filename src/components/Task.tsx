import "./Task.css";

interface TaskProps {
    id: string;
    name: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    completed: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onToggleComplete?: (id: string) => void;
    showCheckbox?: boolean;
    showActions?: boolean;
}

const Task = (props: TaskProps) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        });
    };

    const getPriorityClass = (priority: string) => {
        return `priority-${priority}`;
    };

    const getPriorityLabel = (priority: string) => {
        return priority.charAt(0).toUpperCase() + priority.slice(1);
    };

    return (
        <div className={`task-card ${props.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <div className="task-header">
                    <div className="task-title-section">
                        {(props.showCheckbox !== false) && (
                            <input
                                type="checkbox"
                                checked={props.completed}
                                onChange={() => props.onToggleComplete?.(props.id)}
                                className="task-checkbox"
                            />
                        )}
                        <h3 className={props.completed ? 'completed-text' : ''}>{props.name}</h3>
                    </div>
                    <span className={`priority-badge ${getPriorityClass(props.priority)}`}>
                        {getPriorityLabel(props.priority)}
                    </span>
                </div>

                {props.description && (
                    <p className="task-description">{props.description}</p>
                )}

                {props.dueDate && (
                    <p className="task-due-date">
                        <span className="material-symbols-outlined">schedule</span>
                        Due: {formatDate(props.dueDate)}
                    </p>
                )}
            </div>

            {(props.showActions !== false) && (
                <div className="task-actions">
                    <button onClick={() => props.onEdit?.(props.id)}>
                        Edit <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button onClick={() => props.onDelete?.(props.id)} className="delete-btn">
                        Delete <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            )}
        </div>
    )
}


export default Task;