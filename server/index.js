const express = require('express');
const app = express();
const { port } = require('./_config/config');
const cors = require('cors');
const os = require('os');
const { delayRequest } = require('./middlewares/delay');
const { parseToken } = require('./middlewares/jwt');

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


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Specify the origin to allow
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add other methods if needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow required headers
    credentials: true // If you're handling credentials (cookies, HTTP authentication)
}));
// delay request for random time
// app.use(delayRequest);


app.use('/auth', authRoute);
app.use('/user', validateToken, userRoute);


io.on("connection", (socket) => {
    const token = socket.handshake.headers['authorization'];

    console.log('socket connected ', socket.id);

    // Ensure token is valid before parsing
    if (token) {
        // Remove "Bearer " if it's included
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

        const data = parseToken(tokenWithoutBearer);
        if (data.status) {
            console.log('User ID:', data.id);
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

    // Emit to all clients that a user connected
    io.emit("listen", `User connected: ${socket.id}`);

    // When a message is received from a client
    socket.on("message", (data) => {
        console.log('data', data);

        // Broadcast the message to all clients
        io.emit("listen", data);
    });

    // Handle when a user disconnects
    socket.on("disconnect", () => {
        console.log('socket disconnected ', socket.id);
        // Notify all clients that the user disconnected
        io.emit("listen", `User disconnected: ${socket.id}`);
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