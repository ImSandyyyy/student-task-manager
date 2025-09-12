import React, { useState } from 'react';
import './TaskDialog.css';

interface Task {
    id: string;
    name: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    completed: boolean;
}

interface TaskDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ isOpen, onClose, onAddTask }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!taskName.trim()) {
            return;
        }

        onAddTask({
            name: taskName.trim(),
            description: description.trim() || undefined,
            priority,
            dueDate: dueDate || undefined
        });

        setTaskName('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        onClose();
    };

    const handleCancel = () => {
        setTaskName('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="task-dialog-overlay" onClick={handleCancel} />
            <div className="task-dialog">
                <div className="task-dialog-header">
                    <h2>Create New Task</h2>
                    <button className="close-button" onClick={handleCancel}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="task-dialog-form">
                    <div className="form-group">
                        <label htmlFor="taskName">Task Name *</label>
                        <input
                            id="taskName"
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="Enter task name..."
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter task description..."
                            rows={3}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date</label>
                            <input
                                id="dueDate"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="dialog-actions">
                        <button type="button" onClick={handleCancel} className="cancel-button">
                            Cancel
                        </button>
                        <button type="submit" className="create-button">
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default TaskDialog;