import { useEffect, useState } from "react"
import { deleteOrder, getAllOrders, updateOrder } from "../services/orders"
import { setToken } from "../services/api"
import Loading from "../components/layout/loading"
import "../components/styles/order.css"
import { Navigate, useLocation } from "react-router-dom"

function OrderManagement() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState([])
  const [showInput, setShowInput] = useState(false)
  const [editedClient, setEditedClient] = useState("")
  const [deleteNofitication, setDeleteNotification] = useState("")
  const user = JSON.parse(localStorage.getItem("loggedUser"))

  if (!user) return <Navigate to={"/admin/login"} state={{ from: location }} replace />

  const toggleShowInput = (pedido) => {
    setEditedClient(pedido?.client || "")
    setShowInput(!showInput)
  }

  const updateClient = async (id) => {
    console.log(editedClient)

    await updateOrder(id, { client: editedClient })
    setOrder((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, client: editedClient } : order
      )
    )

    toggleShowInput()
  }

  useEffect(() => {
    setToken(user.token)
    const getOrder = async () => {
      try {
        const response = await getAllOrders()
        console.log(response)

        setOrder(response.reverse())
      } catch (error) {
        console.error("Error al obtener el pedido:", error)
      } finally {
        setLoading(false)
      }
    }

    getOrder()
  }, [])

  const handleDeleteOrder = async (id) => {
    const userConfirm = confirm("Estás seguro de eliminar este pedido")
    if (userConfirm) {
      try {
        const response = await deleteOrder(id)
        setDeleteNotification(response.data.message)
        setOrder((prevOrders) =>
          prevOrders.filter((pedido) => pedido._id !== id)
        )
        setTimeout(() => {
          setDeleteNotification("")
        }, 3000)
      } catch (error) {
        setDeleteNotification(error.message)
      }
    }
  }

  return (
    <div>
      <h1 className="black-title">Panel de Administración de Pedidos</h1>
      <h1>Cantidad de pedidos: {order.length}</h1>
      {loading && <Loading />}
      {order?.map((o) => (
        <div key={o._id}>
          <div className="order-container">
            <div>
              <h1>
                Pedido de {o?.client}
                {showInput && (
                  <>
                    <input
                      id="input-client"
                      type="text"
                      placeholder="Nombre del cliente"
                      value={editedClient}
                      required
                      onChange={(e) => setEditedClient(e.target.value)}
                    />
                    <button
                      onClick={() => updateClient(o._id)}
                      className="buy-button green"
                    >
                      Guardar cliente
                    </button>
                  </>
                )}
              </h1>
              {!showInput && (
                <button
                  onClick={() => toggleShowInput(o)}
                  className="buy-button"
                >
                  Modificar cliente
                </button>
              )}
              <p></p>
              {showInput && (
                <button className="buy-button" onClick={toggleShowInput}>
                  Cancelar
                </button>
              )}
            </div>
            {o?.products.length === 0 ? (
              <h1>Pedido vacio</h1>
            ) : (
              <a href={`pedido/${o?._id}`}>
                <h1 className="yellow-link">Ver productos</h1>
              </a>
            )}

            <button
              onClick={() => handleDeleteOrder(o._id)}
              className="buy-button red"
            >
              Eliminar Pedido
            </button>
          </div>
        </div>
      ))}
      {deleteNofitication && (
        <div className="submitMessage">{deleteNofitication}</div>
      )}
    </div>
  )
}

export default OrderManagement
