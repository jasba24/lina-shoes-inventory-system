import apiClient, { setToken as setAuthToken } from "./api"

const baseURL = "/categories"

export const setToken = (newToken) => setAuthToken(newToken)

export const getAllCategories = () => {
  return apiClient.get(baseURL).then(({ data }) => data)
}

export const createCategory = (newCategory) => {
  return apiClient
    .post(baseURL, newCategory, { headers: { "Content-Type": "multipart/form-data" } })
    .then(({ data }) => data)
}

export const updateCategory = ({ id, formData }) => {
  return apiClient
    .put(`${baseURL}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data)
}

export const deleteCategory = (id) => {
  return apiClient.delete(`${baseURL}/${id}`).then(({ data }) => data)
}
