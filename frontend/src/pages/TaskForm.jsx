import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createTask, getTask, updateTask } from "../services/taskService";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";

export default function TaskForm() {
  const STATUS_OPTIONS = [
    { value: "PENDING", label: "Pendiente" },
    { value: "IN_PROGRESS", label: "En progreso" },
    { value: "COMPLETED", label: "Completada" },
  ];

  const [form, setForm] = useState({ task: "", status: "PENDING" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { taskId } = useParams();
  const isEdit = !!taskId;

  useEffect(() => {
    if (isEdit) {
      const fetchTask = async () => {
        try {
          const res = await getTask(taskId);
          setForm({
            task: res.data.task,
            status: res.data.status,
          });
        } catch (err) {
          setError("Tarea no encontrada");
        }
      };
      fetchTask();
    }
  }, [taskId, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isEdit) {
        await updateTask({ id: taskId, ...form });
      } else {
        await createTask(form);
      }
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      setError("Error al guardar la tarea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {isEdit ? "Editar Tarea" : "Nueva Tarea"}
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Tarea"
              value={form.task}
              onChange={(e) => setForm({ ...form, task: e.target.value })}
              required
              placeholder="Comprar víveres..."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Guardando..." : "Guardar Tarea"}
            </Button>
          </form>

          <Link
            to="/tasks"
            className="block text-center text-sm text-blue-600 hover:underline mt-4"
          >
            ← Volver a tareas
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
