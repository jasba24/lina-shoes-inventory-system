import apiClient, { setToken as setAuthToken } from "./api"

const baseURL = "/images"

export const setToken = (newToken) => setAuthToken(newToken)

export const getImageById = (id) => {
  return apiClient.get(`${baseURL}/${id}`).then(({ data }) => data)
}

export const getImagesByCategory = (route) => {
  return apiClient.get(`${baseURL}/category/${route}`).then(({ data }) => data)
}

export const createImage = (newObject) => {
  return apiClient
    .post(baseURL, newObject, { headers: { "Content-Type": "multipart/form-data" } })
    .then(({ data }) => data)
}

export const deleteImages = (idsArray) => {
  return apiClient.delete(baseURL, { data: { ids: idsArray } })
}

export const updateImage = (updatedObject) => {
  const { id, formData } = updatedObject
  return apiClient
    .put(`${baseURL}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then(({ data }) => data)
}
