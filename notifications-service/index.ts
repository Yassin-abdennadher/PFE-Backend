import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { initSocket } from './socket/indexSocket.js';
import notificationController from './controller/notificationsController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/notifications', notificationController);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'notification-service' });
});

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('✅ MongoDB connecté'))
    .catch(err => console.error('❌ MongoDB erreur:', err));


const server = createServer(app);
const io = initSocket(server);


server.listen(PORT, () => {
    console.log(`🚀 Notification service sur port ${PORT}`);
});

export { io };