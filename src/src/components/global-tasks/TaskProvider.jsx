import { TaskProvider } from '../../context/TasksContext';

const TaskWrapper = ({ children }) => {
  return (
    <TaskProvider>
      <div className="todo-container">
        <h2>🧠 useReducer + Context API</h2>
        {children}
      </div>
    </TaskProvider>
  );
};

export default TaskWrapper;
