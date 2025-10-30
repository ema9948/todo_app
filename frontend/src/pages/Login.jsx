import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../services/authService";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mapa de traducción de errores del backend
  const errorMap = {
    "INCORRECT CREDENTIALS": "Correo o contraseña incorrectos",
    "EMAIL IN USED": "El correo ya está en uso",
    "Debe ingresar un email válido": "Debe ingresar un email válido",
    "El email es obligatorio": "El email es obligatorio",
    "La contraseña es obligatoria": "La contraseña es obligatoria",
    "La contraseña debe tener al menos 8 caracteres":
      "La contraseña debe tener al menos 8 caracteres",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);

      // Login exitoso
      await Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Has iniciado sesión correctamente",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/tasks");
    } catch (err) {
      const backendMessage =
        err.response?.data?.message || "Error al iniciar sesión";
      const translatedMessage = errorMap[backendMessage] || backendMessage;

      Swal.fire({
        icon: "error",
        title: "Error",
        text: translatedMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Iniciar Sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="tu@email.com"
            />
            <Input
              label="Contraseña"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
