export interface TaskItem {
    id: string;
    name: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    completed: boolean;
    createdAt: string;
    createdBy: string;
    lastModified: string;
}

class TaskStorage {
    private static readonly API_BASE_URL = import.meta.env.PROD
        ? '/api'
        : 'http://localhost:3001/api';

    private static async makeRequest(endpoint: string, options?: RequestInit): Promise<any> {
        try {
            const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (response.status === 204) {
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    static async loadTasks(username?: string): Promise<TaskItem[]> {
        try {
            const endpoint = username ? `/tasks/${username}` : '/tasks';
            const tasks = await this.makeRequest(endpoint);
            return tasks || [];
        } catch (error) {
            console.error('Error loading tasks from server:', error);
            return [];
        }
    }

    static async addTask(taskData: Omit<TaskItem, 'id' | 'completed' | 'createdAt' | 'createdBy' | 'lastModified'>, createdBy: string): Promise<TaskItem> {
        try {
            const newTask = await this.makeRequest('/tasks', {
                method: 'POST',
                body: JSON.stringify({
                    ...taskData,
                    createdBy
                })
            });
            return newTask;
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    }

    static async updateTask(taskId: string, updates: Partial<TaskItem>, modifiedBy: string): Promise<TaskItem | null> {
        try {
            const updatedTask = await this.makeRequest(`/tasks/${taskId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...updates,
                    modifiedBy
                })
            });
            return updatedTask;
        } catch (error) {
            console.error('Error updating task:', error);
            return null;
        }
    }

    static async deleteTask(taskId: string): Promise<boolean> {
        try {
            await this.makeRequest(`/tasks/${taskId}`, {
                method: 'DELETE'
            });
            return true;
        } catch (error) {
            console.error('Error deleting task:', error);
            return false;
        }
    }

    static async toggleTaskCompletion(taskId: string, username: string): Promise<TaskItem | null> {
        try {
            const tasks = await this.loadTasks(username);
            const task = tasks.find(t => t.id === taskId);

            if (!task) {
                console.error('Task not found for toggle:', taskId);
                return null;
            }

            await this.makeRequest(`/student-progress/${username}/${taskId}`, {
                method: 'POST',
                body: JSON.stringify({
                    completed: !task.completed
                })
            });

            return {
                ...task,
                completed: !task.completed
            };
        } catch (error) {
            console.error('Error toggling task completion:', error);
            return null;
        }
    }

    static async getTasksByPriority(priority: 'low' | 'medium' | 'high', username?: string): Promise<TaskItem[]> {
        const tasks = await this.loadTasks(username);
        return tasks.filter(task => task.priority === priority);
    }

    static async getCompletedTasks(username?: string): Promise<TaskItem[]> {
        const tasks = await this.loadTasks(username);
        return tasks.filter(task => task.completed);
    }

    static async getPendingTasks(username?: string): Promise<TaskItem[]> {
        const tasks = await this.loadTasks(username);
        return tasks.filter(task => !task.completed);
    }

    static async getTasksByCreator(createdBy: string): Promise<TaskItem[]> {
        const tasks = await this.loadTasks();
        return tasks.filter(task => task.createdBy === createdBy);
    }

    static async getTaskStats(username?: string): Promise<{ total: number; completed: number; pending: number; byPriority: Record<string, number> }> {
        const tasks = await this.loadTasks(username);
        const completed = tasks.filter(task => task.completed).length;
        const pending = tasks.length - completed;

        const byPriority = {
            low: tasks.filter(task => task.priority === 'low').length,
            medium: tasks.filter(task => task.priority === 'medium').length,
            high: tasks.filter(task => task.priority === 'high').length
        };

        return {
            total: tasks.length,
            completed,
            pending,
            byPriority
        };
    }
}

export default TaskStorage;