const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const http = require("http");
const { Server } = require("socket.io");


const app = express()
const server = http.createServer(app); // ใช้ HTTP Server แทน app.listen()
const io = new Server(server, {
    cors: {
        origin: "*", // อนุญาตให้ทุกโดเมนเชื่อมต่อ (สำหรับทดสอบ)
    },
});


app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// ตั้งค่า Socket.io
io.on("connection", (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    socket.on("message", (data) => {
        console.log("Message received:", data);
        io.emit("message", data); // ส่งข้อความให้ทุกคน
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 8888;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));