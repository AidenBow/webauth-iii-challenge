const express = require("express")
const server = express()
const userRouter = require("./routes/user-route")

server.use(express.json())
server.use("/api", userRouter)

module.exports = server