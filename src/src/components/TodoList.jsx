import { useTodoList } from '../hooks/useTodoList';
import './TodoList.css';

export const TodoList = () => {

  const { deleteTask, editTask, editingIndex, handleAddTask, input, setInput, tasks, toggleTask }  =  useTodoList()

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

