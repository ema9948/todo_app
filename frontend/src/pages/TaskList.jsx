import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, deleteTask } from "../services/taskService";
import { logout } from "../services/authService";
import Button from "../components/Button";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import "sweetalert2/dist/sweetalert2.min.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await getTasks();
        setTasks(res.data || []);
      } catch (err) {
        setError("No se pudieron cargar las tareas");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las tareas",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Mapeo de estados al español
  const statusMap = {
    PENDING: "Pendiente",
    IN_PROGRESS: "En Progreso",
    COMPLETED: "Completada",
    COMPLTED: "Completada", // por si llega con typo
  };

  const getStatusColor = (status) => {
    const normalizedStatus = statusMap[status] || status;
    if (normalizedStatus === "Completada") return "bg-green-100 text-green-700";
    if (normalizedStatus === "Pendiente")
      return "bg-yellow-100 text-yellow-700";
    if (normalizedStatus === "En Progreso") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-700";
  };

  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: "¿Eliminar esta tarea?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteTask(taskId);
        setTasks(tasks.filter((t) => t.id !== taskId));
        Swal.fire({
          icon: "success",
          title: "Eliminada",
          text: "Tarea eliminada correctamente",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la tarea",
        });
      }
    }
  };

  const handleLogout = () => {
    logout();
    Swal.fire({
      icon: "info",
      title: "Sesión cerrada",
      timer: 1500,
      showConfirmButton: false,
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Mis Tareas</h1>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/tasks/new")}>
              + Nueva Tarea
            </Button>
            <Button variant="secondary" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Cargando tareas...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center mb-6">
            {error}
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No tienes tareas
            </h3>
            <Button onClick={() => navigate("/tasks/new")}>
              + Crear Tarea
            </Button>
          </div>
        )}

        {!loading && tasks.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-2">
                    {task.task}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {statusMap[task.status] || task.status}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="secondary"
                    className="flex-1 text-sm"
                    onClick={() => navigate(`/tasks/edit/${task.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    className="flex-1 text-sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
