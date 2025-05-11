import { useState } from 'react';
import './TodoList.css';

export const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTask = () => {
    if (input.trim() === '') return;

    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex].text = input;
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }

    setInput('');
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const editTask = (index) => {
    setInput(tasks[index].text);
    setEditingIndex(index);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    if (editingIndex === index) {
      setInput('');
      setEditingIndex(null);
    }
  };

  return (
    <div className="todo-container">
      <h2>📝 To-Do List</h2>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTask}>{editingIndex !== null ? 'Actualizar' : 'Agregar'}</button>
      </div>
      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTask(index)}>
              {task.completed ? '✅' : '⬜'} {task.text}
            </span>
            <div className="actions">
              <button onClick={() => editTask(index)}>✏️</button>
              <button onClick={() => deleteTask(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

