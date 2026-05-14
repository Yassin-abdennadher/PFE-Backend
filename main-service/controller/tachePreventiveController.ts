import type { Request, Response } from 'express';
import express from 'express';
import * as tachePreventiveService from '../service/tachePreventiveService.js';
import { authenticate } from '../middleware/authMiddleware.js';
import axios from 'axios';
const router = express.Router();

router.post('/', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const tache = await tachePreventiveService.createTachePrev(req.body);
    if (!tache) return res.status(400).json({ message: 'Erreur création tache' });
    try {
        await axios.post(`${process.env.NOTIFICATION_SERVICE}`, {
            userId: String(req.body.technicienId),
            type: 'info',
            title: 'Nouvelle intervention préventive',
            message: `${req.body.titre} - Prévue le ${req.body.dateProchaine}`,
            read : false 
        });
    } catch (err) {
        console.error('Erreur envoi notification:', err);
    }
    return res.status(201).json({ message: 'tache créée avec succès', tache });
});

router.get('/', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien' && req.user.role !== 'user') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const taches = await tachePreventiveService.getAllTachePrev();
    if (!taches) return res.status(400).json({ message: 'Aucune Tache Trouvé', data: [] });
    return res.status(200).json({ data: taches });
});

router.get('/:id', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const id = req.params.id as string;
    if (!id || id === '') return res.status(400).json({ message: 'ID manquant' });
    const tache = await tachePreventiveService.getTacheById(id);
    if (!tache) return res.status(400).json({ message: 'Aucune Tache Trouvé', data: [] });
    return res.status(200).json(tache);
});

router.put('/:id', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const id = req.params.id as string;
    if (!id || id === '') return res.status(400).json({ message: 'ID manquant' });
    const tachePrev = await tachePreventiveService.updateTachePrev(id, req.body);
    if (!tachePrev) return res.status(404).json({ message: 'Tache non trouvée' });
    return res.status(200).json({ message: ' Tache Mise A Jour avec Succées', tachePrev });
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const id = req.params.id as string;
    if (!id || id === '') return res.status(400).json({ message: 'ID manquant' });
    const tachePrev = await tachePreventiveService.deleteTachePrev(id);
    if (!tachePrev) return res.status(404).json({ message: 'Tache non trouvée' });
    return res.status(200).json({ tachePrev });
});

export default router;