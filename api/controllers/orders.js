const express = require("express")
const ordersRouter = require("express").Router()
const Order = require("../models/Order")
const userExtractor = require("../middleware/UserExtractor")

ordersRouter.get("/:id", async (req, res) => {
  try {
    const pedido = await Order.findById(req.params.id).populate(
      "products.image"
    )
    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" })

    res.json(pedido)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el pedido", details: error.message })
  }
})

ordersRouter.get("/", userExtractor, async (req, res) => {
  try {
    const pedidos = await Order.find()
      .sort({ date: -1 })
      .populate("products.image")

    const formatted = pedidos.map((pedido) => ({
      _id: pedido._id,
      client: pedido.client,
      date: pedido.date,
      status: pedido.status,
      products: pedido.products,
    }))

    res.json(formatted)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pedidos" })
  }
})

ordersRouter.patch("/:id", userExtractor, async (req, res) => {
  try {
    const { client, products } = req.body
    const updates = {}

    if (client) updates.client = client
    if (products) updates.products = products

    const updated = await Order.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    })
    if (!updated) return res.status(404).json({ error: "Pedido no encontrado" })

    res.json(updated)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar pedido", details: error.message })
  }
})

ordersRouter.delete("/:id", userExtractor, async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Pedido no encontrado" })

    res.json({ message: "Pedido eliminado correctamente" })
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar pedido", details: error.message })
  }
})

ordersRouter.post("/", async (req, res) => {
  try {
    const { products } = req.body

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Debes enviar productos válidos." })
    }

    const formattedProducts = products.map((p) => ({
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.image,
    }))

    const newOrder = new Order({
      products: formattedProducts,
      client: null,
      date: new Date(),
      status: "pendiente",
    })

    const savedOrder = await newOrder.save()
    res.status(201).json(savedOrder)
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el pedido",
      details: error.message,
    })
  }
})

module.exports = ordersRouter
