const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
let cont = 0
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
  var usuario = socket.handshake.auth.usuario
  console.log("a user connected " + usuario)
  if (usuario % 2 == 0) {
    socket.join("room_1")
  } else {
    socket.join("room_2")
  }

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

  socket.on("chat message", (msg) => {
    socket.rooms.forEach((room) => {
      console.log(room)
      socket.to(room).emit("chat message", msg)
    })
  })
  cont++
})

server.listen(3000, () => {
  console.log("listening on *:3000")
})
