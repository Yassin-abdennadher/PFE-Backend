import type { Request, Response } from 'express';
import express from 'express';
import * as machineService from '../service/machineService.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const machine = await machineService.createMachine(req.body);
    if (!machine) return res.status(400).json({ message: 'Erreur création machine' });
    return res.status(201).json({ message: 'Machine créée avec succès', machine });
});

router.get('/', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const machines = await machineService.getAllMachine();
    return res.status(200).json(machines);
});

router.get('/:id', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const id = req.params.id as string;
    if (!id || id === '') return res.status(400).json({ message: 'ID manquant' });
    const machine = await machineService.getMachineById(id);
    if (!machine) return res.status(404).json({ message: 'Machine non trouvée' });
    return res.status(200).json(machine);
});

router.put('/:id', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const id = req.params.id as string;
    if (!id || id === '') return res.status(400).json({ message: 'ID manquant' });
    const machine = await machineService.updateMachine(id, req.body);
    if (!machine) return res.status(404).json({ message: 'Machine non trouvée' });
    return res.status(200).json({ message: 'Machine mise à jour avec succès', machine });
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'accès interdit, admin uniquement' });
    }
    const id = req.params.id as string;
    if (!id || id === '') return res.status(400).json({ message: 'ID manquant' });
    const machine = await machineService.deleteMachine(id);
    if (!machine) return res.status(404).json({ message: 'Machine non trouvée' });
    return res.status(200).json({ message: 'Machine supprimée avec succès' });
});

export default router;