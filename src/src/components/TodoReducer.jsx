import { useReducer, useState } from 'react';
import './TodoList.css';

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { text: action.payload, completed: false }];
    case 'TOGGLE':
      return state.map((task, i) =>
        i === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'EDIT':
      return state.map((task, i) =>
        i === action.payload.index ? { ...task, text: action.payload.newText } : task
      );
    case 'DELETE':
      return state.filter((_, i) => i !== action.payload);
    default:
      return state;
  }
}

export const TodoReducer = () => {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = () => {
    if (input.trim() === '') return;

    if (editIndex !== null) {
      dispatch({ type: 'EDIT', payload: { index: editIndex, newText: input } });
      setEditIndex(null);
    } else {
      dispatch({ type: 'ADD', payload: input });
    }

    setInput('');
  };

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

