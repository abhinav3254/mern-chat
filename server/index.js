const express = require('express');
const app = express();
const { port } = require('./_config/config');
const cors = require('cors');
const os = require('os');
const { delayRequest } = require('./middlewares/delay');
const { parseToken } = require('./middlewares/jwt');

const MessageModel = require('./models/MessageModel');

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
});

// connect to db
const { connectDb } = require('./_config/db-connection');
connectDb();

// middleware
const { validateToken } = require('./middlewares/jwt');


// routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const { UserModel } = require('./models/User');


app.use(express.json());
app.use(cors({
    origin: '*', // Specify the origin to allow
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add other methods if needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow required headers
    credentials: true // If you're handling credentials (cookies, HTTP authentication)
}));
// delay request for random time
// app.use(delayRequest);


app.use('/auth', authRoute);
app.use('/user', validateToken, userRoute);
app.use('/chat', validateToken, chatRoute);

const activeUsers = [];

io.on("connection", (socket) => {
    const token = socket.handshake.headers['authorization'];
    // Ensure token is valid before parsing
    if (token) {
        // Remove "Bearer " if it's included
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

        const data = parseToken(tokenWithoutBearer);
        if (data.status) {
            activeUsers.push({ userId: data.id, socketId: socket.id });
        } else {
            console.error('Invalid token');
            socket.disconnect(); // Optionally disconnect the socket
            return;
        }
    } else {
        console.error('No token provided');
        socket.disconnect(); // Optionally disconnect the socket
        return;
    }

    io.emit("activeUsers", activeUsers);

    // When a message is received from a client
    socket.on("message", async (data) => {
        const message = new MessageModel({
            recipient: data.recipient,
            sender: data.sender,
            message: data.message,
            time: data.time
        });
        const savedMessage = await message.save();
        // Broadcast the message to all clients
        const recipientUser = activeUsers.find(user => user.userId === data.recipient);
        if (recipientUser) {
            // Emit the message to the specific recipient
            io.to(recipientUser.socketId).emit("listen", data);
        }
    });

    // Handle when a user disconnects
    socket.on("disconnect", () => {
        // Remove user from activeUsers array by filtering out their socket ID
        const index = activeUsers.findIndex(user => user.socketId === socket.id);
        if (index !== -1) {
            activeUsers.splice(index, 1);
        }
        // Notify all clients that the user disconnected
        io.emit("activeUsers", activeUsers);
    });
});


function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (let name in interfaces) {
        for (let iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

server.listen(port, () => {
    const ipAddress = getLocalIP();
    console.log(`Server up on http://${ipAddress}:${port}`);
});