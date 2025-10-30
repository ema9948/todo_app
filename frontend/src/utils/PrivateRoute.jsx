import { Navigate } from 'react-router-dom'
import { getCurrentUserId } from '../services/authService'

export default function PrivateRoute({ children }) {
  return getCurrentUserId() ? children : <Navigate to="/login" />
}