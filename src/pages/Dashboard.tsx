import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import Task from "../components/Task";
import TaskDialog from "../components/TaskDialog";
import TaskStorage from "../utils/TaskStorage";
import type { TaskItem } from "../utils/TaskStorage";

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isStudent = user?.role === 'student';
    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const username = isStudent ? user?.username : undefined;
                const loadedTasks = await TaskStorage.loadTasks(username);
                setTasks(loadedTasks);
            } catch (error) {
                console.error('Failed to load tasks:', error);
            }
        };

        loadTasks();
    }, [user, isStudent]);

    const handleAddTask = async (taskData: { name: string; description?: string; priority: 'low' | 'medium' | 'high'; dueDate?: string }) => {
        try {
            const newTask = await TaskStorage.addTask(taskData, user?.username || 'unknown');
            setTasks(prev => [...prev, newTask]);
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const handleToggleComplete = async (id: string) => {
        try {
            const updatedTask = await TaskStorage.toggleTaskCompletion(id, user?.username || 'unknown');
            if (updatedTask) {
                setTasks(prev => prev.map(task =>
                    task.id === id ? updatedTask : task
                ));
            }
        } catch (error) {
            console.error('Failed to toggle task completion:', error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            const success = await TaskStorage.deleteTask(id);
            if (success) {
                setTasks(prev => prev.filter(task => task.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleEditTask = (id: string) => {
        console.log('Edit task:', id);
    };

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    return (
        <>
            <main className="aboutUs scrollable">
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        description={task.description}
                        priority={task.priority}
                        dueDate={task.dueDate}
                        completed={task.completed}
                        onToggleComplete={isStudent ? handleToggleComplete : undefined}
                        onDelete={isStudent ? undefined : handleDeleteTask}
                        onEdit={isStudent ? undefined : handleEditTask}
                        showCheckbox={!isAdmin}
                        showActions={!isStudent}
                    />
                ))}
                {!isStudent && (
                    <Button
                        icon="edit"
                        className="floating-edit-btn"
                        onClick={openDialog}
                    />
                )}
            </main>

            {!isStudent && (
                <TaskDialog
                    isOpen={isDialogOpen}
                    onClose={closeDialog}
                    onAddTask={handleAddTask}
                />
            )}
        </>
    )
}

export default Dashboard;