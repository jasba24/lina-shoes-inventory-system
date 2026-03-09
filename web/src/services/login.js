import apiClient, { setToken as setAuthToken } from "./api"

const baseURL = "/"

export const login = async (credentials) => {
  const { data } = await apiClient.post(`${baseURL}login`, credentials)
  return data
}

export const setToken = (newToken) => setAuthToken(newToken)

export const changePassword = async (credentials) => {
  const { data } = await apiClient.put(`${baseURL}users`, credentials)
  return data
}
