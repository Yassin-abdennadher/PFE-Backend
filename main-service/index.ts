import type { Request,Response } from 'express';
import express from 'express';
import cors from 'cors' ;
import helmet from 'helmet';
import dotenv from 'dotenv';
import machineController from './controller/machineController.js';
import tachePreventiveController from './controller/tachePreventiveController.js';
import { regenererTachesPreventives } from './service/tachePreventiveService.js';
import tacheCurativeController from './controller/tacheCurativeController.js';
import pieceController from './controller/pieceController.js';
import demandeController from './controller/demandeController.js';
import connectDB from './config/mongoConfig.js';
import cron from 'node-cron';
dotenv.config();

const app = express() ;
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req:Request,res:Response)=>{
    res.json({message : 'main-service'});
});

app.use('/machines', machineController);
app.use('/taches/preventive', tachePreventiveController);
app.use('/taches/curative', tacheCurativeController);
app.use('/pieces', pieceController);
app.use('/demandes',demandeController);

cron.schedule('* * * * *', async () => {
  console.log('🔄 Régénération automatique des préventives...');
  await regenererTachesPreventives();
});

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Serveur démarré sur http://localhost:${process.env.PORT}`);
    });
});