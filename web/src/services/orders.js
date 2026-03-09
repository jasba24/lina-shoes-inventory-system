import apiClient, { setToken as setAuthToken } from "./api"

const baseURL = "/orders"

export const setToken = (newToken) => setAuthToken(newToken)

export const getAllOrders = () => {
  return apiClient.get(baseURL).then(({ data }) => data)
}

export const getOrderById = (id) => {
  return apiClient.get(`${baseURL}/${id}`).then(({ data }) => data)
}

export const createOrder = async (products) => {
  const formatted = products.map((item) => ({
    name: item.name,
    category: item.category,
    price: item.price,
    image: item._id,
  }))

  const payload = {
    products: formatted,
    date: new Date(),
    status: "pendiente",
  }

  const response = await apiClient.post(baseURL, payload)
  return response.data
}

export const updateOrder = async (id, updates) => {
  return apiClient.patch(`${baseURL}/${id}`, updates)
}

export const deleteOrder = async (id) => {
  return apiClient.delete(`${baseURL}/${id}`)
}
