import React, { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { TaskFactory } from './TaskFactory';
import { taskManager as TaskManager } from './TaskManager';
import { TaskSortingStrategy } from './TaskSortingStrategy';
import { TaskAdapter } from './TaskAdapter';
import type { Task } from './Task';
import { TaskWithReminder } from './TaskWithReminder';
import { Notification } from './Notification';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleError = (err: unknown) => {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError(String(err));
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.from('tasks').select('*');
                if (error) throw error;
                
                const adaptedTasks = TaskAdapter(data);
                const sortedTasks = TaskSortingStrategy.sortByDate(adaptedTasks);
                setTasks(sortedTasks);
                adaptedTasks.forEach(task => TaskManager.addTask(task));
            } catch (err) {
                handleError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async () => {
        if (!newTaskTitle.trim()) return;
        
        try {
            const newTask: Task = {
                id: Date.now().toString(),
                title: newTaskTitle,
                completed: false,
                duedate: null
            };

            const { error } = await supabase.from('tasks').insert([newTask]);
            if (error) throw error;

            setTasks([...tasks, newTask]);
            TaskManager.addTask(newTask);
            setNewTaskTitle('');
        } catch (err) {
            handleError(err);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const { error } = await supabase.from('tasks').delete().eq('id', id);
            if (error) throw error;
            
            setTasks(tasks.filter(task => task.id !== id));
            TaskManager.removeTask(id);
        } catch (err) {
            handleError(err);
        }
    };

    const toggleComplete = async (task: Task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            const { error } = await supabase
                .from('tasks')
                .update({ completed: updatedTask.completed })
                .eq('id', task.id);
            
            if (error) throw error;

            setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
            TaskManager.removeTask(task.id);
            TaskManager.addTask(updatedTask);
        } catch (err) {
            handleError(err);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="app-container">
            <h1>To-Do List</h1>
            <div className="task-input">
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add new task"
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button onClick={addTask}>Add</button>
            </div>
            <div className="task-list">
                {tasks.map((task) => (
                    <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <TaskFactory 
                            type="checklist" 
                            task={task} 
                            onToggleComplete={() => toggleComplete(task)}
                        />
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        {task.duedate && new Date(task.duedate) < new Date() && (
                            <Notification>Your task is overdue</Notification>
                        )}
                        {task.duedate && <TaskWithReminder task={task} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
