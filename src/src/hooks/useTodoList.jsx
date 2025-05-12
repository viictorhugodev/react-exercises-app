import { useState } from 'react';

export const useTodoList = () => {
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
  
  return {
    tasks,
    input,
    editingIndex,
    setInput,
    handleAddTask,
    toggleTask,
    editTask,
    deleteTask
  }
}
