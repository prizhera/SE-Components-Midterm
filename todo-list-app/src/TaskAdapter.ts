import type { Task } from './Task';

type RawTask = {
    id: string | number;
    title: string;
    description?: string;
    duedate?: string | null;
    due_date?: string | null;
    completed?: boolean;
};

export const TaskAdapter = (data: RawTask[]): Task[] => {
    return data.map((task) => ({
        id: task.id.toString(),
        title: task.title,
        description: task.description || '',
        duedate: task.duedate || task.due_date || null,
        completed: task.completed ?? false,
    }));
};
