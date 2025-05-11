import TaskWrapper from '../components/global-tasks/TaskProvider';
import TaskList from '../components/global-tasks/TaskList';

const Exercise5 = () => {
  return (
    <div>
      <h1>Ejercicio 5: useReducer + Context API</h1>
      <TaskWrapper>
        <TaskList />
      </TaskWrapper>
    </div>
  );
};

export default Exercise5;
