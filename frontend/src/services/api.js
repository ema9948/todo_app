import axios from 'axios'

const API_BASE = 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE,
})

export default api