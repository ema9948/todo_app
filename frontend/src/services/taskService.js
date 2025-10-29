import api from './api'

const getUserId = () => localStorage.getItem('userId')

export const createTask = (taskData) => {
  return api.post(`/task/${getUserId()}`, taskData)
}

export const getTasks = () => {
  return api.get(`/task/${getUserId()}`)
}

export const getTask = (taskId) => {
  return api.get(`/task/${getUserId()}/${taskId}`)
}

export const updateTask = (taskData) => {
  return api.patch(`/task/${getUserId()}`, taskData)
}

export const deleteTask = (taskId) => {
  return api.delete(`/task/${getUserId()}/${taskId}`)
}