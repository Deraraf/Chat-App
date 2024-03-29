import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"
import connectdb from "./db/connectdb.js"

const app = express()
const PORT = process.env.PORT || 5000;

dotenv.config()

app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoute)



app.listen(PORT, () => {
  connectdb()
  console.log(`Server is running on port ${PORT}`)
})
