import './TodoList.css';
import { useTodoReducer } from '../hooks/useTodoReducer';

export const TodoReducer = () => {

const { dispatch, editIndex, handleSubmit, input, setEditIndex, setInput, tasks } = useTodoReducer();


  return (
    <div className="todo-container">
      <h2>🧠 To-Do con useReducer</h2>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button onClick={handleSubmit}>{editIndex !== null ? 'Actualizar' : 'Agregar'}</button>
      </div>

      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => dispatch({ type: 'TOGGLE', payload: index })}>
              {task.completed ? '✅' : '⬜'} {task.text}
            </span>
            <div className="actions">
              <button onClick={() => {
                setInput(task.text);
                setEditIndex(index);
              }}>✏️</button>
              <button onClick={() => dispatch({ type: 'DELETE', payload: index })}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

