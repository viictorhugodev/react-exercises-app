import { useReducer, useState } from "react";

export const useTodoReducer = () => {

  const initialState = [];

  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

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

  return {
    tasks,
    input,
    setInput,
    handleSubmit,
    dispatch,
    editIndex,
    setEditIndex
  }
}
