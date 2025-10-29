import api from './api'

export const register = async (email, password) => {
  const res = await api.post('/auth/register', { email, password })
  return res.data // { userId: 1 }
}

export const login = async (email, password) => {
  const res = await api.post('/auth/authentication', { email, password })
  const { userId } = res.data
  localStorage.setItem('userId', userId)
  return { userId }
}

export const logout = () => {
  localStorage.removeItem('userId')
}

export const getCurrentUserId = () => {
  return localStorage.getItem('userId')
}