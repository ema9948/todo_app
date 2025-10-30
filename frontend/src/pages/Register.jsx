import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { register } from "../services/authService";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mapa de traducción de errores del backend
  const errorMap = {
    "EMAIL IN USED": "El correo ya está en uso", // Corregido para coincidir con tu backend
    "INCORRECT CREDENTIALS": "Credenciales incorrectas",
    "Debe ingresar un email válido": "Debe ingresar un email válido",
    "El email es obligatorio": "El email es obligatorio",
    "La contraseña es obligatoria": "La contraseña es obligatoria",
    "La contraseña debe tener al menos 8 caracteres":
      "La contraseña debe tener al menos 8 caracteres",
    // Agrega más traducciones según los errores que tu backend pueda enviar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.email, form.password);

      // Registro exitoso
      await Swal.fire({
        icon: "success",
        title: "Cuenta creada",
        text: "Tu cuenta se ha creado correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (err) {
      // Obtenemos el mensaje del backend
      const backendMessage =
        err.response?.data?.message || "Error al registrarse";
      const translatedMessage = errorMap[backendMessage] || backendMessage;

      // Mostramos SweetAlert2 con el mensaje traducido
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
      {/* Contenedor del formulario que ocupa el espacio restante */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Crear Cuenta
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
              {loading ? "Creando..." : "Registrarse"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      {/* Footer siempre al final */}
      <Footer />
    </div>
  );
}
