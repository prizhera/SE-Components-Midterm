export interface Task {
    id: string;
    title: string;
    description?: string;
    duedate?: string | null;
    completed: boolean;
}