import axios from "axios"

// base axios instance that can be reused across services
const apiClient = axios.create({
  baseURL: "https://sena-9yju.onrender.com/api",
})

let token = localStorage.getItem("loggedUser")

export const setToken = (newToken) => {
  if (newToken) {
    token = `Bearer ${newToken}`
    localStorage.setItem("loggedUser", token)
  } else {
    token = null
    localStorage.removeItem("loggedUser")
  }
}

// request interceptor to attach token if available
apiClient.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default apiClient
