import express from 'express';
import * as tacheCurativeService from '../service/tacheCurativeService.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/', authenticate, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const tache = await tacheCurativeService.createTacheCur(req.body);
    if (!tache)
        return res.status(400).json({ message: 'Erreur création tache' });
    return res.status(201).json({ message: 'tache créée avec succès', tache });
});
router.get('/', authenticate, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const taches = await tacheCurativeService.getAllTacheCur();
    if (!taches)
        return res.status(400).json({ message: 'Aucune Tache Trouvé' });
    return res.status(200).json(taches);
});
router.get('/:id', authenticate, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const id = req.params.id;
    if (!id || id === '')
        return res.status(400).json({ message: 'ID manquant' });
    const tache = await tacheCurativeService.getTacheById(id);
    if (!tache)
        return res.status(400).json({ message: 'Aucune Tache Trouvé' });
    return res.status(200).json(tache);
});
router.put('/:id', authenticate, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const id = req.params.id;
    if (!id || id === '')
        return res.status(400).json({ message: 'ID manquant' });
    const tacheCur = await tacheCurativeService.updateTacheCur(id, req.body);
    if (!tacheCur)
        return res.status(404).json({ message: 'Tache non trouvée' });
    return res.status(200).json({ message: ' Tache Mise A Jour avec Succées', tacheCur });
});
router.delete('/:id', authenticate, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const id = req.params.id;
    if (!id || id === '')
        return res.status(400).json({ message: 'ID manquant' });
    const tacheCur = await tacheCurativeService.deleteTacheCur(id);
    if (!tacheCur)
        return res.status(404).json({ message: 'Tache non trouvée' });
    return res.status(200).json({ tacheCur });
});
export default router;
//# sourceMappingURL=tacheCurativeController.js.map