import express from 'express';
import * as pieceService from '../service/pieceService.js';
import { authenticate } from '../middleware/authMiddleware.js';
import axios from 'axios';
const router = express.Router();
router.post('/', authenticate, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const piece = await pieceService.createPiece(req.body);
    if (!piece)
        return res.status(400).json({ message: 'Erreur création piece' });
    return res.status(201).json({ message: 'piece créée avec succès', piece });
});
router.get('/', authenticate, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: 'Non authentifié' });
    if (req.user.role !== 'admin' && req.user.role !== 'technicien' && req.user.role !== 'user') {
        return res.status(403).json({ message: 'accès interdit' });
    }
    const pieces = await pieceService.getAllPiece();
    if (!pieces)
        return res.status(400).json({ message: 'Aucune piece Trouvé' });
    return res.status(200).json(pieces);
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
    const piece = await pieceService.getPieceById(id);
    if (!piece)
        return res.status(400).json({ message: 'Aucune piece Trouvé' });
    return res.status(200).json(piece);
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
    const piece = await pieceService.updatePiece(id, req.body);
    if (!piece)
        return res.status(404).json({ message: 'piece non trouvée' });
    if (piece.quantiteStock <= piece.seuilAlerte) {
        await axios.post(`${process.env.NOTIFICATION_SERVICE}`, {
            userId: '7',
            type: 'warning',
            title: 'Stock bas',
            message: `${piece.nom} - Stock: ${piece.quantiteStock}`
        });
    }
    return res.status(200).json({ message: ' piece Mise A Jour avec Succées', piece });
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
    const piece = await pieceService.deletePiece(id);
    if (!piece)
        return res.status(404).json({ message: 'piece non trouvée' });
    return res.status(200).json({ piece });
});
export default router;
//# sourceMappingURL=pieceController.js.map