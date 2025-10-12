import React, { useState, useEffect } from "react";
import { addTask, getAllTasks } from "../utils/indexedDB";

interface Task {
  id: number;
  description: string;
}

const OfflineForm: React.FC = () => {
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Cargar tareas desde IndexedDB al montar el componente
    getAllTasks().then(setTasks);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      description,
    };
    await addTask(newTask);
    setTasks(await getAllTasks());
    setDescription("");
  };

  return (
    <div>
      <h2>Agregar tarea offline</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción de la tarea"
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default OfflineForm;
