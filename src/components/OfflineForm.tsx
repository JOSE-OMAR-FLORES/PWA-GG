import React, { useState, useEffect } from "react";
import { addTask, getAllTasks, clearTasks } from "../utils/db";
import "./OfflineForm.css";

interface Task {
  id: number;
  description: string;
  createdAt?: string;
}

const OfflineForm: React.FC = () => {
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const loadedTasks = await getAllTasks();
    setTasks(loadedTasks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedDescription = description.trim();
    if (!trimmedDescription) return;

    setIsSubmitting(true);

    try {
      const newTask: Task = {
        id: Date.now(),
        description: trimmedDescription,
        createdAt: new Date().toLocaleString('es-MX', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      await addTask(newTask);
      await loadTasks();
      setDescription("");
      
      // Feedback visual
      console.log("✅ Tarea agregada exitosamente");
    } catch (error) {
      console.error("❌ Error al agregar tarea:", error);
      alert("Error al guardar la tarea. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const db = await import("../utils/db").then(m => m.getDB());
      await db.delete("tasks", taskId);
      await loadTasks();
      console.log("🗑️ Tarea eliminada");
    } catch (error) {
      console.error("❌ Error al eliminar tarea:", error);
    }
  };

  const handleClearAll = async () => {
    if (tasks.length === 0) return;
    
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar todas las ${tasks.length} tareas?`
    );
    
    if (confirmed) {
      try {
        await clearTasks();
        await loadTasks();
        console.log("🗑️ Todas las tareas eliminadas");
      } catch (error) {
        console.error("❌ Error al limpiar tareas:", error);
      }
    }
  };

  return (
    <div className="offline-form-container">
      <div className="form-card">
        {/* Form Header */}
        <div className="form-header">
          <div className="form-icon">📝</div>
          <h2 className="form-title">Gestión de Tareas Offline</h2>
          <p className="form-description">
            Agrega y gestiona tus tareas sin conexión. Todo se guarda localmente en tu dispositivo.
          </p>
        </div>

        {/* Task Form */}
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="task-input" className="form-label">
              <span className="label-icon">✏️</span>
              Nueva Tarea
            </label>
            <div className="form-input-wrapper">
              <span className="input-icon">📋</span>
              <input
                id="task-input"
                type="text"
                className="form-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribe tu tarea aquí..."
                maxLength={200}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting || !description.trim()}
          >
            {isSubmitting ? (
              <>
                <span>⏳</span>
                Guardando...
              </>
            ) : (
              <>
                <span>➕</span>
                Agregar Tarea
              </>
            )}
          </button>
        </form>

        {/* Tasks Section */}
        <div className="tasks-section">
          <div className="tasks-header">
            <div className="tasks-count">
              <span>📚</span>
              Mis Tareas
              <span className="count-badge">{tasks.length}</span>
            </div>
            
            {tasks.length > 0 && (
              <button 
                className="clear-all-button"
                onClick={handleClearAll}
              >
                <span>🗑️</span>
                Limpiar Todo
              </button>
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3 className="empty-title">No hay tareas todavía</h3>
              <p className="empty-description">
                Agrega tu primera tarea usando el formulario de arriba
              </p>
            </div>
          ) : (
            <ul className="tasks-grid">
              {tasks.map((task) => (
                <li key={task.id} className="task-item">
                  <span className="task-icon">✅</span>
                  
                  <div className="task-content">
                    <p className="task-description">{task.description}</p>
                    {task.createdAt && (
                      <div className="task-meta">
                        <span>🕒</span>
                        {task.createdAt}
                      </div>
                    )}
                  </div>
                  
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTask(task.id)}
                    aria-label={`Eliminar tarea: ${task.description}`}
                    title="Eliminar tarea"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineForm;