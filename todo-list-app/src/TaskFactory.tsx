import React from 'react';
import type { Task } from './Task';

interface TaskFactoryProps {
    type: 'basic' | 'timed' | 'checklist';
    task: Task;
    onToggleComplete?: () => void;
}

export const TaskFactory: React.FC<TaskFactoryProps> = ({ 
    type, 
    task, 
    onToggleComplete 
}) => {
    switch (type) {
        case 'basic':
            return <div className="task">{task.title}</div>;
        case 'timed':
            return (
                <div className="task">
                    <span>{task.title}</span>
                    {task.duedate && <span>Due: {new Date(task.duedate).toLocaleDateString()}</span>}
                </div>
            );
        case 'checklist':
            return (
                <div className="task" onClick={onToggleComplete}>
                    <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={onToggleComplete}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span>{task.title}</span>
                </div>
            );
        default:
            return <div>Invalid task type</div>;
    }
};