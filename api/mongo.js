const mongoose = require("mongoose")
const uri = process.env.MONGO_DB_URI

mongoose
  .connect(uri)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar:", err))
