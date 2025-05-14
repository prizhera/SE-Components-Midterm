import type { Task } from './Task';

class TaskManager {
    private static instance: TaskManager;
    private tasks: Task[] = [];

    private constructor() {}

    public static getInstance(): TaskManager {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }

    public addTask(task: Task): void {
        this.tasks.push(task);
    }

    public removeTask(taskId: string): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    public getTasks(): Task[] {
        return this.tasks;
    }

    public searchTasks(query: string): Task[] {
        return this.tasks.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    public getTaskById(id: string): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }
}

export const taskManager = TaskManager.getInstance();