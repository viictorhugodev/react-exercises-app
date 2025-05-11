import { useState } from 'react';
import { useTasks } from '../../context/TasksContext';
import '../../components/TodoList.css';

const TaskList = () => {
  const { tasks, dispatch } = useTasks();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() === '') return;
    dispatch({ type: 'ADD', payload: input });
    setInput('');
  };

  return (
    <>
      <div className="todo-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nueva tarea global"
        />
        <button onClick={handleAdd}>Agregar</button>
      </div>
      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => dispatch({ type: 'TOGGLE', payload: index })}>
              {task.completed ? '✅' : '⬜'} {task.text}
            </span>
            <div className="actions">
              <button onClick={() => dispatch({ type: 'DELETE', payload: index })}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
