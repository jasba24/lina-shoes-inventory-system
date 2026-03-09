const userExtractor = require("../middleware/UserExtractor")
const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/User")

usersRouter.get("/", async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post("/", async (req, res) => {
  try {
    const { username, name, password } = req.body

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username y password son requeridos" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el usuario", details: error.message })
  }
})

usersRouter.put("/", userExtractor, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    const userId = req.userId // extraído del token por el middleware

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    // Verificar contraseña actual
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    )
    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña actual incorrecta" })
    }

    // Hashear nueva contraseña
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

    user.passwordHash = hashedPassword
    await user.save()

    res.status(200).json({ message: "Contraseña actualizada correctamente" })
  } catch (error) {
    res.status(500).json({
      message: "Error al cambiar la contraseña",
      details: error.message,
    })
  }
})

usersRouter.delete("/:id", userExtractor, async (req, res) => {
  try {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.status(200).json({ message: "Usuario eliminado con éxito" })
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar al usuario", details: error.message })
  }
})

module.exports = usersRouter
