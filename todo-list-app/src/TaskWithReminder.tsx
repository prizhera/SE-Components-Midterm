import React from 'react';
import type { Task } from './Task';

interface TaskWithReminderProps {
    task: Task;
}

export const TaskWithReminder: React.FC<TaskWithReminderProps> = ({ task }) => {
    return (
        <span className="reminder" title={`Due: ${task.duedate}`}>
            ⏰
        </span>
    );
};