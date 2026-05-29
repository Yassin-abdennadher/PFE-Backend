import express from 'express';
import * as demandeService from '../service/demandeService.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/', authenticate, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'user') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const demande = await demandeService.createDemande(req.body);
    if (!demande)
        return res.status(400).json({ message: 'Erreur création demande' });
    return res.status(201).json({ message: 'demande créée avec succès', demande });
});
router.get('/', authenticate, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien' && req.user.role !== 'user') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const demandes = await demandeService.getAllDemande();
    return res.status(200).json(demandes);
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
    const demande = await demandeService.getDemandeById(id);
    if (!demande)
        return res.status(404).json({ message: 'Demande non trouvée' });
    return res.status(200).json(demande);
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
    const demande = await demandeService.updateDemande(id, req.body);
    if (!demande)
        return res.status(404).json({ message: 'Demande non trouvée' });
    return res.status(200).json({ message: 'Demande mise à jour avec succès', demande });
});
router.delete('/:id', authenticate, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'accès interdit, admin uniquement' });
    }
    const id = req.params.id;
    if (!id || id === '')
        return res.status(400).json({ message: 'ID manquant' });
    const demande = await demandeService.deleteDemande(id);
    if (!demande)
        return res.status(404).json({ message: 'Demande non trouvée' });
    return res.status(200).json({ message: 'Demande supprimée avec succès' });
});
export default router;
//# sourceMappingURL=demandeController.js.map