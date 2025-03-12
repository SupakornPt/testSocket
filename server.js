const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ✅ เพิ่ม route GET /
app.get("/", (req, res) => {
    res.send("Socket.io Server is running!");
});

// ตั้งค่า WebSocket
io.on("connection", (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    socket.on("message", (data) => {
        console.log("📩 Message received:", data);
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

// ใช้ PORT ของ Render
const PORT = process.env.PORT || 8888;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
