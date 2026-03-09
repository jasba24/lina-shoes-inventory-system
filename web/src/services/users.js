import apiClient from "./api"
const baseURL = "/users"

export const createUser = async (credentials) => {
  const { data } = await apiClient.post(baseURL, credentials)
  return data
}
