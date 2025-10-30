import api from './api'

const getUserId = () => localStorage.getItem('userId')

// -----------------------------
// CREATE
// -----------------------------
export const createTask = (taskData) => {
  console.log('Creating task:', taskData)

  // Ejemplo de taskData esperado:
  // {
  //   task: "Finish report",
  //   status: "PENDING"
  // }

  return api.post(`/tasks/${getUserId()}`, taskData)
}

// -----------------------------
// READ
// -----------------------------
export const getTasks = () => {
  return api.get(`/tasks/${getUserId()}`)
}

export const getTask = (taskId) => {
  return api.get(`/tasks/${getUserId()}/${taskId}`)
}

// -----------------------------
// UPDATE (PATCH)
// -----------------------------
export const updateTask = (taskData) => {
  // Ejemplo:
  // {
  //   id: 1,
  //   task: "Finish report",
  //   status: "COMPLETED"
  // }
  return api.patch(`/tasks/${getUserId()}`, taskData)
}

// -----------------------------
// DELETE
// -----------------------------
export const deleteTask = (taskId) => {
  return api.delete(`/tasks/${getUserId()}/${taskId}`)
}
