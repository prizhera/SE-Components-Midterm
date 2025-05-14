import type { Task } from './Task';

export const TaskSortingStrategy = {
    sortByDate: (tasks: Task[]) => {
        return [...tasks].sort((a, b) => {
            if (!a.duedate && !b.duedate) return 0;
            if (!a.duedate) return 1;
            if (!b.duedate) return -1;
            return new Date(a.duedate).getTime() - new Date(b.duedate).getTime();
        });
    },
    sortByName: (tasks: Task[]) => {
        return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    },
    sortByCompletion: (tasks: Task[]) => {
        return [...tasks].sort((a, b) => {
            if (a.completed === b.completed) return 0;
            return a.completed ? 1 : -1;
        });
    }
};