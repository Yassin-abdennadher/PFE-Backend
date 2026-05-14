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
app.use('/machines', machineController);
app.use('/taches/preventive', tachePreventiveController);
app.use('/taches/curative', tacheCurativeController);
app.use('/pieces', pieceController);
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Serveur démarré sur http://localhost:${process.env.PORT}`);
    });
});
//# sourceMappingURL=index.js.map