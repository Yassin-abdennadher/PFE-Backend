import type { Request, Response } from 'express';
import express from 'express';
import * as tacheCurativeService from '../service/tacheCurativeService.js';
import { authenticate } from '../middleware/authMiddleware.js';
import axios from 'axios';
const router = express.Router();

router.post('/', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const tache = await tacheCurativeService.createTacheCur(req.body);
    if (!tache) return res.status(400).json({ message: 'Erreur création tache' });
    try {
        await axios.post(`${process.env.NOTIFICATION_SERVICE}`, {
            userId: String(req.body.technicienId),
            type: 'warning',
            title: 'Nouvelle intervention curative',
            message: `${req.body.titre} - Urgence: ${req.body.urgence}`
        });
    } catch (err) {
        console.error('Erreur envoi notification:', err);
    }
    return res.status(201).json({ message: 'tache créée avec succès', tache });
});

router.get('/', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien' && req.user.role !== 'user' ) {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const taches = await tacheCurativeService.getAllTacheCur();
    if (typeof taches === 'string') return res.status(400).json({ message: 'Aucune Tache Trouvé', data: [] });
    return res.status(200).json({ data: taches });
});

router.get('/:id', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const id = req.params.id as string;
    if (!id || id === '') return res.status(400).json({ message: 'ID manquant' });
    const tache = await tacheCurativeService.getTacheById(id);
    if (!tache) return res.status(400).json({ message: 'Aucune Tache Trouvé', data: [] });
    return res.status(200).json({ data: tache });
});

router.put('/:id', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const id = req.params.id as string;
    if (!id || id === '') return res.status(400).json({ message: 'ID manquant' });
    const tacheCur = await tacheCurativeService.updateTacheCur(id, req.body);
    if (!tacheCur) return res.status(404).json({ message: 'Tache non trouvée', data: [] });
    return res.status(200).json({ message: ' Tache Mise A Jour avec Succées', data: tacheCur });
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const id = req.params.id as string;
    if (!id || id === '') return res.status(400).json({ message: 'ID manquant' });
    const tacheCur = await tacheCurativeService.deleteTacheCur(id);
    if (!tacheCur) return res.status(404).json({ message: 'Tache non trouvée' });
    return res.status(200).json({ data: tacheCur });
});

export default router;