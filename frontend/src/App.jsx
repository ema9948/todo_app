import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import TaskList from './pages/TaskList'
import TaskForm from './pages/TaskForm'
import PrivateRoute from './utils/PrivateRoute'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/new"
          element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/edit/:taskId"
          element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}