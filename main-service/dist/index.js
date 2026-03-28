import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import machineController from './controller/machineController.js';
import tachePreventiveController from './controller/tachePreventiveController.js';
import tacheCurativeController from './controller/tacheCurativeController.js';
import pieceController from './controller/pieceController.js';
import connectDB from './config/mongoConfig.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ message: 'main-service' });
});
app.use('/machine', machineController);
app.use('/tachePreventive', tachePreventiveController);
app.use('/tacheCurative', tacheCurativeController);
app.use('/piece', pieceController);
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Serveur démarré sur 1 http://localhost:${process.env.PORT}`);
    });
});
//# sourceMappingURL=index.js.map