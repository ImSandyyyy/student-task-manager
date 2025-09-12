const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const TASKS_FILE = path.join(__dirname, 'data', 'tasks.json');
const STUDENT_PROGRESS_FILE = path.join(__dirname, 'data', 'student-progress.json');

async function ensureDataDirectory() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

async function readTasksFile() {
    try {
        const data = await fs.readFile(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        const defaultTasks = [
            {
                id: '1',
                name: 'Complete React Tutorial',
                description: 'Finish the React documentation tutorial',
                priority: 'medium',
                dueDate: '2025-09-20',
                completed: false,
                createdAt: new Date().toISOString(),
                createdBy: 'admin',
                lastModified: new Date().toISOString()
            }
        ];
        await writeTasksFile(defaultTasks);
        return defaultTasks;
    }
}

async function writeTasksFile(tasks) {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

async function readStudentProgressFile() {
    try {
        const data = await fs.readFile(STUDENT_PROGRESS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        const defaultProgress = {};
        await writeStudentProgressFile(defaultProgress);
        return defaultProgress;
    }
}

async function writeStudentProgressFile(progress) {
    await fs.writeFile(STUDENT_PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

app.get('/api/tasks/:username?', async (req, res) => {
    try {
        const { username } = req.params;
        const tasks = await readTasksFile();

        if (username) {
            const studentProgress = await readStudentProgressFile();
            const userProgress = studentProgress[username] || {};

            const tasksWithProgress = tasks.map(task => ({
                ...task,
                completed: userProgress[task.id] !== undefined ? userProgress[task.id] : task.completed
            }));

            res.json(tasksWithProgress);
        } else {
            res.json(tasks);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to load tasks' });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const { name, description, priority, dueDate, createdBy } = req.body;
        const tasks = await readTasksFile();

        const newTask = {
            id: Date.now().toString(),
            name,
            description,
            priority,
            dueDate,
            completed: false,
            createdAt: new Date().toISOString(),
            createdBy,
            lastModified: new Date().toISOString()
        };

        tasks.push(newTask);
        await writeTasksFile(tasks);

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { modifiedBy, ...updates } = req.body;
        const tasks = await readTasksFile();

        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...updates,
            lastModified: new Date().toISOString()
        };

        await writeTasksFile(tasks);
        res.json(tasks[taskIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = await readTasksFile();

        const filteredTasks = tasks.filter(task => task.id !== id);
        if (filteredTasks.length === tasks.length) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await writeTasksFile(filteredTasks);

        const studentProgress = await readStudentProgressFile();
        Object.keys(studentProgress).forEach(username => {
            delete studentProgress[username][id];
        });
        await writeStudentProgressFile(studentProgress);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

app.post('/api/student-progress/:username/:taskId', async (req, res) => {
    try {
        const { username, taskId } = req.params;
        const { completed } = req.body;

        const studentProgress = await readStudentProgressFile();

        if (!studentProgress[username]) {
            studentProgress[username] = {};
        }

        studentProgress[username][taskId] = completed;
        await writeStudentProgressFile(studentProgress);

        res.json({ success: true, completed });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student progress' });
    }
});

ensureDataDirectory().catch(console.error);

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}