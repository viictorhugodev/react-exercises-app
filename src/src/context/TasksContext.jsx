import { createContext, useReducer, useContext } from 'react';

const TasksContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { text: action.payload, completed: false }];
    case 'TOGGLE':
      return state.map((task, i) =>
        i === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'DELETE':
      return state.filter((_, i) => i !== action.payload);
    default:
      return state;
  }
}

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
